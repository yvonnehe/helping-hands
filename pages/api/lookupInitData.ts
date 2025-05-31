// pages/api/lookupInitData.ts
import { redis, redisKeyPrefix } from "../../lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { reference } = req.query;
    if (!reference || typeof reference !== "string") {
        return res.status(400).json({ error: "Missing reference" });
    }

    const key = `${redisKeyPrefix}:init:${reference}`;
    const data = await redis.get(key);
    if (!data) {
        return res.status(404).json({ error: "Init data not found" });
    }

    return res.status(200).json(JSON.parse(data as string));
}
