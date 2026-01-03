import type { NextApiRequest, NextApiResponse } from "next";
import { redis, redisKeyPrefix } from "../../../lib/redis";
import axios from "axios";

// Admin backfill endpoint: reads `${redisKeyPrefix}:agreement:{reference}` mappings,
// for each mapping ensures `${redisKeyPrefix}:confirmed:{agreementId}` exists by
// fetching the agreement from Vipps and storing a confirmed entry. Protected by CRON_SECRET or ADMIN_SECRET.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const authHeader = req.headers.authorization as string | undefined;
    const cronSecret = process.env.CRON_SECRET;
    const adminSecret = process.env.ADMIN_SECRET;
    const isAuthed = authHeader === `Bearer ${cronSecret}` || authHeader === `Bearer ${adminSecret}`;

    if (!isAuthed) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const mappingKeys = await redis.keys(`${redisKeyPrefix}:agreement:*`);
        const mappings = mappingKeys.map(k => k.split(":").pop()).filter(Boolean) as string[];

        let created = 0;
        const skipped: string[] = [];
        const errors: Array<{ reference: string; agreementId?: string; error: any }> = [];

        // Fetch an access token once
        const tokenResp = await axios.post(`${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`, {}, {
            headers: {
                "Content-Type": "application/json",
                "client_id": process.env.VIPPS_CLIENT_ID!,
                "client_secret": process.env.VIPPS_CLIENT_SECRET!,
                "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
            },
        });

        const accessToken = tokenResp.data.access_token;

        for (const reference of mappings) {
            try {
                const agreementId = await redis.get(`${redisKeyPrefix}:agreement:${reference}`);
                if (!agreementId) {
                    skipped.push(reference || "(empty)");
                    continue;
                }

                const confirmedKey = `${redisKeyPrefix}:confirmed:${agreementId}`;
                const exists = await redis.get(confirmedKey);
                if (exists) {
                    skipped.push(String(agreementId));
                    continue;
                }

                // Fetch agreement from Vipps
                const agreementResp = await axios.get(
                    `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreementId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                            "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                        },
                    }
                );

                const { amount, interval, nextDueDate, phoneNumber, productName, created: createdAt } = agreementResp.data;

                const anchorDay = Math.min(28, new Date(nextDueDate).getDate());

                const entry = {
                    agreementId,
                    reference,
                    amount: amount?.amount ?? null,
                    interval: interval?.unit ?? null,
                    nextDueDate,
                    phoneNumber: phoneNumber ?? "",
                    productName: productName ?? "",
                    anchorDay,
                    createdDate: createdAt ?? new Date().toISOString(),
                };

                await redis.set(confirmedKey, JSON.stringify(entry));
                created++;
            } catch (err) {
                errors.push({ reference, error: err?.response?.data ?? err.message ?? err });
            }
        }

        return res.status(200).json({ message: `Backfill complete`, created, skippedCount: skipped.length, errors });
    } catch (err) {
        console.error("🚨 Backfill failed:", err);
        return res.status(500).json({ error: "Backfill failed", details: err?.message ?? String(err) });
    }
}
