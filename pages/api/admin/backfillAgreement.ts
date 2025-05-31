import { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const agreements = req.body;

    if (!Array.isArray(agreements)) {
        return res.status(400).json({ error: "Expected an array of agreement objects" });
    }

    let stored = 0;

    try {
        for (const agreement of agreements) {
            const { agreementId, createdDate, nextDueDate, amount, interval, reference, productName, phoneNumber } = agreement;

            if (!agreementId || !createdDate || !nextDueDate || !amount || !interval || !reference) {
                console.warn("⚠️ Skipping invalid agreement:", agreement);
                continue;
            }

            const redisKey = `${redisKeyPrefix}:confirmed:${agreementId}`;
            const redisValue = JSON.stringify({
                agreementId,
                createdDate,
                nextDueDate,
                amount,
                interval,
                reference: "",
                productName: productName || "Unknown",
                phoneNumber: phoneNumber || "",
            });

            await redis.set(redisKey, redisValue);
            stored++;
        }

        res.status(200).json({ message: `✅ Stored ${stored} agreements` });
    } catch (error) {
        console.error("🚨 Error backfilling agreements:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
