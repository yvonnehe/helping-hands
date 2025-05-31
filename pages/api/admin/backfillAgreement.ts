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
            if (!agreement.agreementId || !agreement.orderId || !agreement.nextChargeDate) {
                console.warn("⚠️ Skipping invalid agreement:", agreement);
                continue;
            }

            const redisKey = `${redisKeyPrefix}:agreement:${agreement.agreementId}`;
            const redisValue = JSON.stringify({
                agreementId: agreement.agreementId,
                amount: agreement.pricing?.amount ?? 0,
                interval: agreement.interval?.unit ?? "MONTH",
                nextDueDate: agreement.nextChargeDate,
                phoneNumber: agreement.phoneNumber || "",
                productName: agreement.productName || "Unknown",
                reference: agreement.orderId,
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
