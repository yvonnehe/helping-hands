//import { tempStore } from "../../lib/tempStore";
import { redis, redisKeyPrefix } from "../../lib/redis";

// export default async function handler(req, res) {
//     const { reference } = req.body;
//     tempStore.delete(reference);
//     res.status(200).json({ message: "Reference cleaned up" });
// }
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { reference } = req.body;

    if (!reference) {
        return res.status(400).json({ message: "Missing reference" });
    }

    try {
        const redisKey = `${redisKeyPrefix}:agreement:${reference}`;
        await redis.del(redisKey);
        console.log(`🧹 Deleted Redis key: ${redisKey}`);

        return res.status(200).json({ message: "Reference cleaned up" });
    } catch (error) {
        console.error("❌ Error cleaning up Redis key:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
