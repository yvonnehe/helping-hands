import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { amount, phoneNumber, reference, returnUrl, paymentType, child } = req.body;

    try {
        // 🔹 Ensure base URL is always HTTPS
        const isLocal = process.env.NODE_ENV === "development";
        const localUrl = "https://your-ngrok-url.com"; // Replace with your `ngrok` HTTPS URL
        const baseUrl = isLocal ? localUrl : "https://helpinghands.no";

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

        // 🔹 Handle Recurring Payments
        if (paymentType === "recurring") {
            console.log("🔹 Creating recurring payment agreement...");

            // 🔹 Ensure productName is properly set
            const productName = child && child.trim() !== "" ? `Fadder - ${child}` : "Månedlig giver";

            const agreementPayload = {
                interval: { unit: "MONTH", count: 1 },
                pricing: { amount: amount * 100, currency: "NOK" },
                merchantRedirectUrl: `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=recurring`,
                merchantAgreementUrl: `${baseUrl}/avtale`,
                phoneNumber: phoneNumber.replace(/\D/g, ""), // Remove non-numeric characters
                productName: productName,
                orderId: reference
            };

            console.log("📤 Sending request to Vipps for agreement creation...");
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

                console.log("✅ Vipps Agreement Response:", agreementResponse.data);
                return res.status(200).json({ agreementUrl: agreementResponse.data.vippsConfirmationUrl });
            } catch (vippsError: any) {
                console.error("🚨 Vipps Agreement Error:", vippsError.response?.data || vippsError.message);
                return res.status(500).json({ error: vippsError.response?.data || "Error creating Vipps agreement" });
            }
        }

        // 🔹 Handle One-Time Payments
        console.log("🔹 Initiating one-time payment...");

        const paymentResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_VIPPS_BASE_URL}/epayment/v1/payments`,
            {
                amount: { currency: "NOK", value: amount },
                paymentMethod: { type: "WALLET" },
                customer: { phoneNumber: phoneNumber.replace(/\D/g, "") }, // Ensure correct phone format
                reference,
                returnUrl: `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=one-time`,
                userFlow: "WEB_REDIRECT",
                paymentDescription: "One-time donation",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
                    "Merchant-Serial-Number": process.env.VIPPS_MERCHANT_SERIAL_NUMBER!,
                    "Idempotency-Key": reference,
                },
            }
        );

        console.log("✅ Vipps One-Time Payment Response:", paymentResponse.data);
        res.status(200).json(paymentResponse.data);
    } catch (error: any) {
        console.error("🚨 Error processing payment:", {
            message: error.message,
            responseData: error.response?.data,
            responseStatus: error.response?.status,
            requestPayload: req.body
        });

        res.status(500).json({
            error: error.response?.data || "Error processing payment"
        });
    }
}
