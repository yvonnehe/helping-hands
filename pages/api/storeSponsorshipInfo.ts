import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { reference, name, email, phoneNumber } = req.body;

    if (!reference) {
        return res.status(400).json({ error: "Missing reference" });
    }

    try {
        const key = `${redisKeyPrefix}:owner:${reference}`;
        const payload = {
            name: name ?? null,
            email: email ?? null,
            phoneNumber: phoneNumber ?? null,
            savedAt: new Date().toISOString(),
        };

        // Keep owner info for a reasonable time (90 days)
        await redis.set(key, JSON.stringify(payload), { ex: 90 * 24 * 3600 });

        return res.status(200).json({ message: "Stored sponsorship owner info" });
    } catch (err) {
        console.error("❌ Failed to store sponsorship info:", err);
        return res.status(500).json({ error: "Failed to store sponsorship info" });
    }
}
