import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/accesstoken/get`,
            {},
            {
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
            }
        );

        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Error fetching access token" });
    }
}
