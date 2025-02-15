import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { reference, paymentType } = req.query;

    try {
        const tokenResponse = await axios.post(`${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`, {}, {
            headers: {
                "Content-Type": "application/json",
                "client_id": process.env.VIPPS_CLIENT_ID!,
                "client_secret": process.env.VIPPS_CLIENT_SECRET!,
                "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        let statusResponse;

        if (paymentType === "recurring") {
            console.log("Checking recurring agreement status...");
            statusResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v2/agreements/${reference}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                        "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                    },
                }
            );
        } else {
            console.log("Checking one-time payment status...");
            statusResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/epayment/v1/payments/${reference}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                        "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                    },
                }
            );
        }

        res.status(200).json(statusResponse.data);
    } catch (error: any) {
        console.error("Error fetching payment status:", error.response?.data || error.message);
        res.status(500).json({ error: error.message || "Error fetching payment status" });
    }
}
