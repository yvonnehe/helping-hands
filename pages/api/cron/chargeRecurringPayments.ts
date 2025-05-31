import { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../../lib/redis";
import axios from "axios";

const REDIS_SCAN_LIMIT = 100;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // ✅ Secure the endpoint with CRON_SECRET
    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const now = new Date();

    try {
        let cursor = 0;
        let charged = 0;

        do {
            const [nextCursor, keys] = await redis.scan(cursor, {
                match: `${redisKeyPrefix}:agreement:*`,
                count: REDIS_SCAN_LIMIT,
            });

            cursor = Number(nextCursor);

            for (const key of keys) {
                const data = await redis.get(key);
                if (!data) continue;

                const agreement = JSON.parse(data as string);

                // Skip if nextDueDate is in the future
                const nextDue = new Date(agreement.nextDueDate);
                if (nextDue > now) continue;

                const result = await chargeVippsAgreement(agreement);
                if (result.success) {
                    charged++;
                    agreement.nextDueDate = result.newNextDueDate;
                    await redis.set(key, JSON.stringify(agreement));
                } else {
                    console.error(`❌ Failed to charge agreement: ${agreement.agreementId}`, result.error);
                }
            }
        } while (cursor !== 0);

        res.status(200).json({ message: `✅ Charged ${charged} agreements` });
    } catch (err) {
        console.error("🚨 Cron job failed:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function chargeVippsAgreement(agreement: any) {
    try {
        const accessToken = await getVippsAccessToken();

        const chargePayload = {
            amount: agreement.amount,
            description: `Vipps autocharge for ${agreement.productName}`,
        };

        const chargeResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreement.agreementId}/charge`,
            chargePayload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                },
            }
        );

        console.log(`✅ Charged ${agreement.agreementId}`);

        // Add 1 month or 1 year based on interval
        const currentDate = new Date();
        const newNextDueDate = new Date(
            agreement.interval === "YEAR"
                ? currentDate.setFullYear(currentDate.getFullYear() + 1)
                : currentDate.setMonth(currentDate.getMonth() + 1)
        );

        return { success: true, newNextDueDate: newNextDueDate.toISOString() };
    } catch (err: any) {
        return { success: false, error: err.response?.data || err.message };
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
