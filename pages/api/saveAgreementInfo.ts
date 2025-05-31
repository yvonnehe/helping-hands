import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../lib/redis";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { agreementId, reference, type } = req.body;

    if (!agreementId || !reference || !type) {
        return res.status(400).json({ error: "Missing agreementId, reference, or type" });
    }

    try {
        // Fetch full agreement details from Vipps
        const tokenResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`,
            {},
            {
                headers: {
                    "client_id": process.env.VIPPS_CLIENT_ID!,
                    "client_secret": process.env.VIPPS_CLIENT_SECRET!,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        const agreementResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreementId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                },
            }
        );

        const { amount, interval, nextDueDate, phoneNumber, productName, created } = agreementResponse.data;

        const entry = {
            agreementId,
            reference,
            type,
            amount: amount.amount,
            interval: interval.unit,
            nextDueDate: nextDueDate,
            phoneNumber,
            productName,
            createdDate: created,
        };

        const redisKey = `${redisKeyPrefix}:confirmed:${agreementId}`;
        await redis.set(redisKey, JSON.stringify(entry));
        console.log(`✅ Saved confirmed agreement: ${agreementId} (${reference})`);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("❌ Error saving confirmed agreement:", error);
        res.status(500).json({ error: "Failed to save confirmed agreement" });
    }
}
