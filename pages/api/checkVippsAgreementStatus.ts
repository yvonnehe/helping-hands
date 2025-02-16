import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { agreementId } = req.query;

    if (!agreementId) {
        return res.status(400).json({ error: "Missing agreementId" });
    }

    try {
        const accessToken = await getVippsAccessToken();

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/${agreementId}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                },
            }
        );

        console.log("✅ Vipps Agreement Status Response:", response.data);
        res.status(200).json({ status: response.data.status });
    } catch (error: any) {
        console.error("🚨 Error retrieving Vipps agreement status:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to retrieve agreement status" });
    }
}

async function getVippsAccessToken() {
    const tokenResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "client_id": process.env.VIPPS_CLIENT_ID!,
                "client_secret": process.env.VIPPS_CLIENT_SECRET!,
                "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
            },
        }
    );

    return tokenResponse.data.access_token;
}
