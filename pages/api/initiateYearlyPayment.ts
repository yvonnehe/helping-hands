import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { amount, phoneNumber, reference, returnUrl, child } = req.body;

    try {
        // 🔹 Ensure base URL is always HTTPS
        const localUrl = "https://your-ngrok-url.com"; // Replace with your actual ngrok URL
        const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : "https://helpinghands.no"; // Ensure fallback

        const baseUrl = process.env.NODE_ENV === "development" ? localUrl : vercelUrl;

        // 🔹 Get access token from Vipps
        console.log("🔹 Fetching access token from Vipps...");
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

        const accessToken = tokenResponse.data.access_token;
        console.log("✅ Access token received!");

        console.log("🔹 Creating yearly recurring payment agreement...");

        // 🔹 Ensure productName is properly set
        //const productName = child && child.trim() !== "" ? `Årlig fadder - ${child}` : "Årlig giver";
        const productName = "Støttemedlem";

        const agreementPayload = {
            interval: { unit: "YEAR", count: 1 }, // 🔹 Yearly payment
            pricing: { amount: amount, currency: "NOK" }, // Convert amount to øre
            merchantRedirectUrl: `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=yearly-recurring`,
            merchantAgreementUrl: `${baseUrl}/avtale`,
            phoneNumber: phoneNumber.replace(/\D/g, ""), // Remove non-numeric characters
            productName: productName,
            orderId: reference,
            initialCharge: {
                amount: amount, // Same as monthly amount
                description: `Første betaling for ${productName}`,
                transactionType: "DIRECT_CAPTURE"
            }
        };

        console.log("📤 Sending request to Vipps for yearly agreement creation...");
        console.log("📝 Agreement Payload:", JSON.stringify(agreementPayload, null, 2));

        try {
            const agreementResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/recurring/v3/agreements/`,
                agreementPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                        "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                        "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                        "Idempotency-Key": reference,
                        "Vipps-System-Name": "HelpingHands",
                        "Vipps-System-Version": "1.0",
                        "Vipps-System-Plugin-Name": "HelpingHands-Vipps",
                        "Vipps-System-Plugin-Version": "1.0"
                    },
                }
            );

            console.log("✅ Vipps Yearly Agreement Response:", agreementResponse.data);
            return res.status(200).json({ agreementUrl: agreementResponse.data.vippsConfirmationUrl });
        } catch (vippsError: any) {
            console.error("🚨 Vipps Yearly Agreement Error:", vippsError.response?.data || vippsError.message);
            return res.status(500).json({ error: vippsError.response?.data || "Error creating Vipps yearly agreement" });
        }
    } catch (error: any) {
        console.error("🚨 Error processing yearly payment:", {
            message: error.message,
            responseData: error.response?.data,
            responseStatus: error.response?.status,
            requestPayload: req.body
        });

        res.status(500).json({
            error: error.response?.data || "Error processing yearly payment"
        });
    }
}
