import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
//import { tempStore } from "../../lib/tempStore";
import { redis, redisKeyPrefix } from "../../lib/redis";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    // 🔒 Sanity check for missing environment variables
    if (
        !process.env.VIPPS_CLIENT_ID ||
        !process.env.VIPPS_CLIENT_SECRET ||
        !process.env.VIPPS_SUBSCRIPTION_KEY ||
        !process.env.VIPPS_MERCHANT_SERIAL_NUMBER ||
        !process.env.VIPPS_SYSTEM_NAME ||
        !process.env.VIPPS_SYSTEM_VERSION ||
        !process.env.VIPPS_PLUGIN_NAME ||
        !process.env.VIPPS_PLUGIN_VERSION
    ) {
        console.error("🚨 Missing one or more Vipps environment variables");
        return res.status(500).json({ error: "Server misconfiguration: Missing Vipps credentials" });
    }

    const { amount, phoneNumber, reference, returnUrl, paymentType, child } = req.body;

    try {
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
                    "Vipps-System-Name": process.env.VIPPS_SYSTEM_NAME!,
                    "Vipps-System-Version": process.env.VIPPS_SYSTEM_VERSION!,
                    "Vipps-System-Plugin-Name": process.env.VIPPS_PLUGIN_NAME!,
                    "Vipps-System-Plugin-Version": process.env.VIPPS_PLUGIN_VERSION!,
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
                pricing: { amount: amount, currency: "NOK" },
                merchantRedirectUrl: returnUrl,
                merchantAgreementUrl: returnUrl.replace("/redirect", "/avtale"),
                phoneNumber: phoneNumber.replace(/\D/g, ""), // Remove non-numeric characters
                productName: productName,
                orderId: reference,
                initialCharge: {
                    amount: amount, // Same as monthly amount
                    description: `Første betaling for ${productName}`,
                    transactionType: "DIRECT_CAPTURE"
                }
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

                //tempStore.set(reference, agreementResponse.data.agreementId);
                //console.log(`🧠 Stored agreementId in memory for ${reference}`);

                // await redis.set(`${redisKeyPrefix}:agreement:${reference}`, agreementResponse.data.agreementId, {
                //     ex: 600, // expires in 10 minutes
                // });
                // console.log(`🔐 Stored agreementId in Redis for ${reference}`);
                await redis.set(`${redisKeyPrefix}:init:${reference}`, JSON.stringify({
                    interval: "MONTH",
                    amount: amount,
                    productName: productName,
                    reference: reference
                }), {
                    ex: 1800 // 30-minute expiry
                });
                console.log(`🧠 Temp agreement data stored in Redis for ${reference}`);


                return res.status(200).json({
                    agreementUrl: agreementResponse.data.vippsConfirmationUrl,
                    agreementId: agreementResponse.data.agreementId,
                });
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
                returnUrl: returnUrl,
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
