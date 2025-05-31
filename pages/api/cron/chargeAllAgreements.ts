import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { redis, redisKeyPrefix } from "../../../lib/redis";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Optional: Add back authorization if needed
    // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    try {
        const accessToken = await getVippsAccessToken();
        const allAgreements = await fetchAllActiveAgreements(accessToken);

        const now = new Date();
        const dueAgreements = [];

        for (const agreement of allAgreements) {
            const redisKey = `${redisKeyPrefix}:confirmed:${agreement.id}`;
            const redisRaw = await redis.get(redisKey);

            if (!redisRaw) continue;

            try {
                const redisData =
                    typeof redisRaw === "string" ? JSON.parse(redisRaw) : redisRaw;

                console.log(`[${agreement.id}] Raw Redis:`, redisRaw);
                console.log(`[${agreement.id}] Parsed Redis nextDueDate:`, redisData.nextDueDate);

                const dueDate = new Date(redisData.nextDueDate);
                console.log(`[${agreement.id}] Redis due: ${dueDate.toISOString()} | Now: ${now.toISOString()} | Should charge: ${dueDate <= now}`);

                if (dueDate <= now) {
                    dueAgreements.push({ vippsData: agreement, redisKey, redisData, dueDate });
                }
            } catch (err) {
                console.error(`⚠️ Failed to parse redis data for ${agreement.id}`, err);
            }
        }

        console.log(`🔍 Found ${dueAgreements.length} due agreements`);

        let charged = 0;
        let failed = 0;

        for (const entry of dueAgreements) {
            const { vippsData, redisKey, redisData, dueDate } = entry;

            const result = await attemptChargeWithRetry(vippsData, accessToken, MAX_RETRIES);

            if (result.success) {
                charged++;

                const newNextDueDate = calculateNextDueDate(dueDate, redisData.interval);

                await redis.set(
                    redisKey,
                    JSON.stringify({
                        ...redisData,
                        nextDueDate: newNextDueDate.toISOString()
                    })
                );

                await logChargeAttempt(vippsData.id, {
                    status: "success",
                    chargedAt: new Date().toISOString(),
                    amount: vippsData.pricing.amount,
                    productName: vippsData.productName,
                    nextDueDate: newNextDueDate.toISOString(),
                });
            } else {
                failed++;
                console.error(`❌ Failed to charge ${vippsData.id}`, result.error);
                await logChargeAttempt(vippsData.id, {
                    status: "failed",
                    chargedAt: new Date().toISOString(),
                    error: result.error,
                });
            }
        }

        res.status(200).json({ message: `✅ Charged ${charged}, ❌ Failed ${failed}` });
    } catch (err) {
        console.error("🚨 Cron job failed:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function fetchAllActiveAgreements(accessToken: string): Promise<any[]> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
            "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
        },
    });

    return response.data.filter((agreement: any) => agreement.status === "ACTIVE");
}

async function attemptChargeWithRetry(agreement: any, accessToken: string, retriesLeft: number): Promise<{ success: boolean, error?: any }> {
    try {
        await chargeVippsAgreement(agreement, accessToken);
        return { success: true };
    } catch (err) {
        if (retriesLeft > 0) {
            console.warn(`⚠️ Retry (${MAX_RETRIES - retriesLeft + 1}) for ${agreement.id}`);
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
            return attemptChargeWithRetry(agreement, accessToken, retriesLeft - 1);
        } else {
            return { success: false, error: err.response?.data || err.message };
        }
    }
}

async function chargeVippsAgreement(agreement: any, accessToken: string) {
    const payload = {
        amount: agreement.pricing.amount,
        description: `Vipps autocharge for ${agreement.productName}`,
        transactionType: "DIRECT_CAPTURE",
        retryDays: 2,
        due: new Date().toISOString().split("T")[0],
    };

    await axios.post(
        `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreement.id}/charges`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
            },
        }
    );

    console.log(`✅ Charged agreement: ${agreement.id}`);
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
