// /pages/api/ping-redis.ts
import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "../../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const timestamp = new Date().toISOString();

    // Set key with expiration to avoid buildup
    await redis.set("ping:keepalive", timestamp, { ex: 172800 }); // TTL 2 days

    res.status(200).json({ message: `Pinged Redis at ${timestamp}` });
}
