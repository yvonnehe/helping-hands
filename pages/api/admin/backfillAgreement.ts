import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const auth = req.headers.authorization;
    if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { agreementId, amount, interval, phoneNumber, productName, reference, nextDueDate } = req.body;

    if (!agreementId || !amount || !interval || !phoneNumber || !productName || !reference || !nextDueDate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const key = `${redisKeyPrefix}:agreement:${agreementId}`;

    try {
        await redis.set(
            key,
            JSON.stringify({
                agreementId,
                amount,
                interval,
                phoneNumber,
                productName,
                reference,
                nextDueDate,
            })
        );

        res.status(200).json({ message: "Agreement added to Redis successfully" });
    } catch (err) {
        console.error("❌ Failed to backfill agreement:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
