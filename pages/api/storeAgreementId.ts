// pages/api/storeAgreementId.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { reference, agreementId } = req.body;

    if (!reference || !agreementId) {
        return res.status(400).json({ error: "Missing reference or agreementId" });
    }

    try {
        await redis.set(`${redisKeyPrefix}:agreement:${reference}`, agreementId, {
            ex: 600, // Expires in 10 minutes
        });
        return res.status(200).json({ message: "Stored successfully" });
    } catch (err) {
        console.error("❌ Redis store error:", err);
        return res.status(500).json({ error: "Failed to store agreementId" });
    }
}
