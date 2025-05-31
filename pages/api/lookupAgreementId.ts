// import { tempStore } from "../../lib/tempStore";

// export default async function handler(req, res) {
//     const { reference } = req.query;

//     if (typeof reference !== "string") {
//         return res.status(400).json({ error: "Invalid reference" });
//     }

//     const agreementId = tempStore.get(reference);

//     if (!agreementId) {
//         return res.status(404).json({ error: "Agreement ID not found" });
//     }

//     res.status(200).json({ agreementId });
// }

// pages/api/lookupAgreementId.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { reference } = req.query;

    if (typeof reference !== "string") {
        return res.status(400).json({ error: "Missing or invalid reference" });
    }

    try {
        const agreementId = await redis.get<string>(`${redisKeyPrefix}:agreement:${reference}`);
        if (!agreementId) {
            return res.status(404).json({ error: "Agreement ID not found" });
        }

        return res.status(200).json({ agreementId });
    } catch (err) {
        console.error("❌ Redis lookup error:", err);
        return res.status(500).json({ error: "Failed to look up agreementId" });
    }
}
