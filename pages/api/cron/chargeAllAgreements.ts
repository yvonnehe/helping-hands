import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { redis, redisKeyPrefix } from "../../../lib/redis";
import { randomUUID } from "crypto";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST" && req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    console.log(`🕒 Cron job started at ${new Date().toISOString()}`);

    // Optional: Add back authorization if needed
    // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    try {
        const accessToken = await getVippsAccessToken();
        const now = new Date();
        const dueAgreements = [];
        const overdueAgreements = [];

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

                const dueDate = new Date(redisData.nextDueDate);

                const twoDaysFromNow = new Date();
                twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

                const dueDateStr = dueDate.toISOString().split("T")[0];
                const targetDateStr = twoDaysFromNow.toISOString().split("T")[0];

                if (dueDateStr === targetDateStr) {
                    dueAgreements.push({ agreementId, redisKey, redisData, dueDate });
                } else if (dueDate < now) {
                    overdueAgreements.push({ agreementId, redisKey, redisData, dueDate });
                }
            } catch (err) {
                console.error(`⚠️ Failed to parse redis data for ${agreementId}`, err);
            }
        }

        console.log(`🔍 Found ${dueAgreements.length} agreements due in 2 days`);
        console.log(`⚠️ Found ${overdueAgreements.length} overdue agreements`);

        let charged = 0;
        let failed = 0;

        for (const entry of [...dueAgreements, ...overdueAgreements]) {
            const { agreementId, redisKey, redisData, dueDate } = entry;
            const isOverdue = overdueAgreements.some(a => a.agreementId === agreementId);

            const agreement = await fetchAgreementById(agreementId!, accessToken);
            if (!agreement || agreement.status !== "ACTIVE") {
                console.log(`⏭ Skipping ${agreementId}, not ACTIVE`);
                continue;
            }

            const result = await attemptChargeWithRetry(
                agreement,
                redisData,
                accessToken,
                MAX_RETRIES,
                isOverdue
            );

            if (result.success) {
                charged++;
                const newNextDueDate = calculateNextDueDate(dueDate, redisData.interval);

                await redis.set(
                    redisKey,
                    JSON.stringify({
                        ...redisData,
                        nextDueDate: newNextDueDate.toISOString(),
                    })
                );

                console.log(`✅ Successfully charged and updated: ${agreementId} (${isOverdue ? "overdue" : "on-time"})`);

                await logChargeAttempt(agreementId, {
                    status: isOverdue ? "success (overdue)" : "success",
                    chargedAt: new Date().toISOString(),
                    amount: agreement.pricing.amount,
                    productName: agreement.productName,
                    nextDueDate: newNextDueDate.toISOString(),
                });
            } else {
                failed++;
                console.error(`❌ Failed to charge ${agreementId}`, result.error);
                await logChargeAttempt(agreementId, {
                    status: isOverdue ? "failed (overdue)" : "failed",
                    chargedAt: new Date().toISOString(),
                    error: result.error,
                });
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
    forceTodayDue: boolean = false
): Promise<{ success: boolean; error?: any }> {
    try {
        await chargeVippsAgreement(agreement, accessToken, redisData, forceTodayDue);
        return { success: true };
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
            return attemptChargeWithRetry(agreement, redisData, accessToken, retriesLeft - 1, forceTodayDue);
        } else {
            return { success: false, error: data || err.message };
        }
    }
}

async function chargeVippsAgreement(
    agreement: any,
    accessToken: string,
    redisData: any,
    forceTodayDue: boolean = false
) {
    const due = forceTodayDue
        ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // today + 2 days
        : redisData.nextDueDate.split("T")[0];

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
                    "Idempotency-Key": crypto.randomUUID(), // Ensure unique key for retries
                },
            }
        );

        console.log(`✅ Charged agreement: ${agreement.id}`, response.data);
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

function calculateNextDueDate(previous: Date, interval: "MONTH" | "YEAR"): Date {
    const next = new Date(previous);

    if (interval === "MONTH") {
        next.setMonth(next.getMonth() + 1);
    } else if (interval === "YEAR") {
        next.setFullYear(next.getFullYear() + 1);
    }

    // Ensure date never exceeds 28th
    if (next.getDate() > 28) {
        next.setDate(28);
    }

    return next;
}
