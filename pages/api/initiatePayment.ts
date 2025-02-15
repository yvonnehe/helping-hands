import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { amount, reference, phoneNumber, returnUrl } = req.body;

    try {
        // Get access token first
        const tokenResponse = await axios.post(`${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`, {}, {
            headers: {
                "Content-Type": "application/json",
                "client_id": process.env.VIPPS_CLIENT_ID,
                "client_secret": process.env.VIPPS_CLIENT_SECRET,
                "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
                "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                "Vipps-System-Name": process.env.VIPPS_SYSTEM_NAME,
                "Vipps-System-Version": process.env.VIPPS_SYSTEM_VERSION,
                "Vipps-System-Plugin-Name": process.env.VIPPS_PLUGIN_NAME,
                "Vipps-System-Plugin-Version": process.env.VIPPS_PLUGIN_VERSION,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // Initiate payment
        const paymentResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/epayment/v1/payments`,
            {
                amount: { currency: "NOK", value: amount },
                paymentMethod: { type: "WALLET" },
                customer: { phoneNumber },
                reference,
                returnUrl,
                userFlow: "WEB_REDIRECT",
                paymentDescription: "Test Payment",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
                    "Idempotency-Key": reference,
                    "Vipps-System-Name": process.env.VIPPS_SYSTEM_NAME,
                    "Vipps-System-Version": process.env.VIPPS_SYSTEM_VERSION,
                    "Vipps-System-Plugin-Name": process.env.VIPPS_PLUGIN_NAME,
                    "Vipps-System-Plugin-Version": process.env.VIPPS_PLUGIN_VERSION,
                },
            }
        );

        res.status(200).json(paymentResponse.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error initiating payment" });
    }
}
