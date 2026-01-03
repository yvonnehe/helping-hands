import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { redis, redisKeyPrefix } from "../../../lib/redis";
import { nextAnchorDate, calculateNextDueDate } from "../../../lib/scheduling";
import { randomUUID } from "crypto";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;
// App-side retry window and limits (daily retries across days when payer may get funds)
const RETRY_WINDOW_DAYS = 5; // try up to 5 days after anchor day by default
const MAX_DAILY_ATTEMPTS = 5; // max attempts across the retry window

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST" && req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    console.log(`🕒 Cron job started at ${new Date().toISOString()}`);

    // Authorization check - accept either an explicit cron secret OR Vercel's scheduled request header
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization as string | undefined;
    const isCronSecret = authHeader === `Bearer ${cronSecret}`;
    const vercelCronHeader = req.headers["x-vercel-cron"] as string | undefined;
    const isVercelCron = vercelCronHeader === "1" || vercelCronHeader === "true";

    if (!isCronSecret && !isVercelCron) {
        console.warn("🚫 Unauthorized cron request");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const accessToken = await getVippsAccessToken();
        const now = new Date();
        const dueAgreements: Array<any> = [];

        const keys = await redis.keys(`${redisKeyPrefix}:confirmed:agr_*`);
        const ids = keys.map(key => key.split(":").pop()).filter(Boolean);

        console.log(`🔍 Checking ${ids.length} confirmed agreements`);

        for (const agreementId of ids) {
            const redisKey = `${redisKeyPrefix}:confirmed:${agreementId}`;
            const redisRaw = await redis.get(redisKey);

            if (!redisRaw) continue;

            try {
                const redisData =
                    typeof redisRaw === "string" ? JSON.parse(redisRaw) : redisRaw;

                const anchorDate = new Date(redisData.nextDueDate);

                const twoDaysFromNow = new Date();
                twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

                const anchorDateStr = anchorDate.toISOString().split("T")[0];
                const twoDaysFromNowStr = twoDaysFromNow.toISOString().split("T")[0];
                const todayStr = now.toISOString().split("T")[0];

                // Compute retry window for this anchor (anchor-2 .. anchor+RETRY_WINDOW_DAYS)
                const chargeWindowStart = new Date(anchorDate);
                chargeWindowStart.setDate(chargeWindowStart.getDate() - 2);
                const chargeWindowEnd = new Date(anchorDate);
                chargeWindowEnd.setDate(chargeWindowEnd.getDate() + RETRY_WINDOW_DAYS);

                // Per-anchor retry state key (includes anchor date so retries are per-month)
                const retryKey = `${redisKeyPrefix}:retry:${agreementId}:${anchorDateStr}`;
                const retryRaw = await redis.get(retryKey);
                const retryState = retryRaw && typeof retryRaw === "string" ? JSON.parse(retryRaw) : retryRaw;
                const attemptsSoFar = retryState?.attempts ?? 0;
                const lastAttemptDay = retryState?.lastAttempt ? retryState.lastAttempt.split("T")[0] : null;

                // Normal on-time flow: schedule charge creation 2 days before anchor
                if (anchorDateStr === twoDaysFromNowStr) {
                    // Only queue if we haven't already tried today
                    if (lastAttemptDay !== todayStr) {
                        dueAgreements.push({ agreementId, redisKey, redisData, dueDate: anchorDate, dueForVipps: anchorDate, isOverdue: false, retryKey });
                    }
                } else if (anchorDate < now) {
                    // Overdue anchor: attempt within the retry window (anchor-2 .. anchor+RETRY_WINDOW_DAYS)
                    if (now >= chargeWindowStart && now <= chargeWindowEnd && attemptsSoFar < MAX_DAILY_ATTEMPTS && lastAttemptDay !== todayStr) {
                        // For overdue anchors we schedule Vipps due to today+2 days (so Vipps has a future due date),
                        // but we still treat the attempt as for the original anchor month.
                        dueAgreements.push({ agreementId, redisKey, redisData, dueDate: anchorDate, dueForVipps: twoDaysFromNow, isOverdue: true, retryKey });
                    }
                }
            } catch (err) {
                console.error(`⚠️ Failed to parse redis data for ${agreementId}`, err);
            }
        }

        console.log(`🔍 Found ${dueAgreements.length} agreements to prepare/create charges for`);

        let charged = 0;
        let failed = 0;

        for (const entry of dueAgreements) {
            const { agreementId, redisKey, redisData, dueDate, isOverdue } = entry;

            const agreement = await fetchAgreementById(agreementId!, accessToken);
            if (!agreement) {
                console.log(`⏭ Skipping ${agreementId}, failed to fetch agreement`);
                await logChargeAttempt(agreementId, {
                    attemptAt: new Date().toISOString(),
                    attemptType: "fetch_agreement",
                    result: "failed",
                    reason: "fetch_failed",
                });
                continue;
            }

            if (agreement.status !== "ACTIVE") {
                console.log(`⏭ Skipping ${agreementId}, not ACTIVE (${agreement.status})`);
                await logChargeAttempt(agreementId, {
                    attemptAt: new Date().toISOString(),
                    attemptType: "skipped",
                    result: "skipped",
                    reason: `agreement_status_${agreement.status}`,
                });
                continue;
            }

            // Use the due override if present (for overdue retries we schedule Vipps due = today+2)
            const dueOverride = (entry as any).dueForVipps;
            const attemptsSoFarKey = (entry as any).retryKey;
            const attemptsSoFarRaw = attemptsSoFarKey ? await redis.get(attemptsSoFarKey) : null;
            const attemptsSoFarObj = attemptsSoFarRaw && typeof attemptsSoFarRaw === "string" ? JSON.parse(attemptsSoFarRaw) : attemptsSoFarRaw;
            const attemptNumber = (attemptsSoFarObj?.attempts ?? 0) + 1;

            const result = await attemptChargeWithRetry(agreement, redisData, accessToken, MAX_RETRIES, false, dueOverride);

            if (result.success) {
                charged++;
                // Compute the next anchored due date after the one we just charged
                const newNextDueDate = nextAnchorDate(new Date(dueDate), redisData.interval, redisData.anchorDay);

                await redis.set(redisKey, JSON.stringify({ ...redisData, nextDueDate: newNextDueDate.toISOString() }));

                // Clear any retry state for this anchor (if present)
                if ((entry as any).retryKey) {
                    await redis.del((entry as any).retryKey);
                }

                console.log(`✅ Successfully charged and updated: ${agreementId} (${isOverdue ? "overdue" : "on-time"})`);

                // structured success log
                await logChargeAttempt(agreementId, {
                    attemptAt: new Date().toISOString(),
                    attemptType: "create_charge",
                    attemptNumber,
                    result: "created",
                    dueDateSent: (dueOverride ? (dueOverride instanceof Date ? dueOverride.toISOString() : String(dueOverride)) : redisData.nextDueDate).split("T")[0],
                    amount: agreement.pricing.amount,
                    ownerName: redisData?.ownerName ?? null,
                    ownerEmail: redisData?.ownerEmail ?? null,
                    vippsResponse: (result as any).response ?? null,
                });
            } else {
                failed++;
                console.error(`❌ Failed to charge ${agreementId}`, (result as any).error);

                // structured failure log
                await logChargeAttempt(agreementId, {
                    attemptAt: new Date().toISOString(),
                    attemptType: "create_charge",
                    attemptNumber,
                    result: "failed",
                    dueDateSent: (dueOverride ? (dueOverride instanceof Date ? dueOverride.toISOString() : String(dueOverride)) : redisData.nextDueDate).split("T")[0],
                    amount: agreement.pricing.amount,
                    ownerName: redisData?.ownerName ?? null,
                    ownerEmail: redisData?.ownerEmail ?? null,
                    error: (result as any).error,
                });

                // Update retry state so we can attempt again on subsequent days within the retry window
                if ((entry as any).retryKey) {
                    const rk = (entry as any).retryKey;
                    const existingRaw = await redis.get(rk);
                    const existing = existingRaw && typeof existingRaw === "string" ? JSON.parse(existingRaw) : existingRaw;
                    const attempts = (existing?.attempts ?? 0) + 1;
                    const retryStateObj = {
                        attempts,
                        lastAttempt: new Date().toISOString(),
                        lastError: (result as any).error,
                    };
                    // set TTL to keep retry state for the window plus a buffer (seconds)
                    const ttlSeconds = (RETRY_WINDOW_DAYS + 7) * 24 * 3600;
                    await redis.set(rk, JSON.stringify(retryStateObj), { ex: ttlSeconds });
                }
            }
        }

        console.log(`🔚 Cron job finished. ✅ Charged: ${charged}, ❌ Failed: ${failed}`);
        if (charged === 0 && failed === 0) {
            console.log("No agreements charged or failed.");
        }
        res.status(200).json({ message: `✅ Charged ${charged}, ❌ Failed ${failed}` });
    } catch (err) {
        console.error("🚨 Cron job failed:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function fetchAgreementById(agreementId: string, accessToken: string): Promise<any | null> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreementId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error(`⚠️ Failed to fetch agreement ${agreementId}:`, err.response?.data || err.message);
        return null;
    }
}

async function attemptChargeWithRetry(
    agreement: any,
    redisData: any,
    accessToken: string,
    retriesLeft: number,
    forceTodayDue: boolean = false,
    dueOverride?: Date | string
): Promise<{ success: true; response: any } | { success: false; error: any }> {
    try {
        const resp = await chargeVippsAgreement(agreement, accessToken, redisData, forceTodayDue, dueOverride);
        return { success: true, response: resp };
    } catch (err: any) {
        const status = err.response?.status;
        const data = err.response?.data;

        console.error(
            `❌ Vipps charge failed for ${agreement.id} (status: ${status ?? "unknown"}):`,
            data || err.message
        );

        if (retriesLeft > 0) {
            console.warn(`⚠️ Retry (${MAX_RETRIES - retriesLeft + 1}) for ${agreement.id}`);
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
            return attemptChargeWithRetry(agreement, redisData, accessToken, retriesLeft - 1, forceTodayDue, dueOverride);
        } else {
            return {
                success: false,
                error: {
                    status: status ?? "unknown",
                    data: data ?? err.message,
                    message: err.message,
                    code: err.code,
                },
            };
        }
    }
}

async function chargeVippsAgreement(
    agreement: any,
    accessToken: string,
    redisData: any,
    forceTodayDue: boolean = false,
    dueOverride?: Date | string
) {
    let due: string;
    if (dueOverride) {
        due = (dueOverride instanceof Date ? dueOverride.toISOString() : String(dueOverride)).split("T")[0];
    } else {
        due = forceTodayDue
            ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // today + 2 days
            : redisData.nextDueDate.split("T")[0];
    }

    const payload = {
        amount: agreement.pricing.amount,
        description: `Vipps autocharge for ${agreement.productName}`,
        transactionType: "DIRECT_CAPTURE",
        retryDays: 2,
        due,
    };

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreement.id}/charges`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                    "Vipps-System-Name": "HelpingHands",
                    "Vipps-System-Version": "1.0",
                    "Vipps-System-Plugin-Name": "HelpingHands-Vipps",
                    "Vipps-System-Plugin-Version": "1.0",
                    "Idempotency-Key": randomUUID(), // Ensure unique key for retries
                },
            }
        );

        console.log(`✅ Charged agreement: ${agreement.id}`, response.data);
        return { status: response.status, data: response.data };
    } catch (err: any) {
        const status = err?.response?.status || "Unknown";
        const data = err?.response?.data || err.message;
        console.error(`❌ Vipps charge failed for ${agreement.id} (status: ${status}):`, data);
        throw err;
    }
}

async function getVippsAccessToken(): Promise<string> {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`, {}, {
        headers: {
            "Content-Type": "application/json",
            "client_id": process.env.VIPPS_CLIENT_ID!,
            "client_secret": process.env.VIPPS_CLIENT_SECRET!,
            "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
            "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
            "Vipps-System-Name": process.env.VIPPS_SYSTEM_NAME!,
            "Vipps-System-Version": process.env.VIPPS_SYSTEM_VERSION!,
            "Vipps-System-Plugin-Name": process.env.VIPPS_PLUGIN_NAME!,
            "Vipps-System-Plugin-Version": process.env.VIPPS_PLUGIN_VERSION!,
        },
    });

    return response.data.access_token;
}

async function logChargeAttempt(agreementId: string, log: any) {
    const key = `vipps:history:${agreementId}`;
    await redis.lpush(key, JSON.stringify(log));
    await redis.ltrim(key, 0, 49); // Keep max 50 logs
}

// scheduling helpers moved to lib/scheduling.ts
