'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextHead from "../components/NextHead";
import axios from "axios";

const RedirectPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [queryParams, setQueryParams] = useState({
        reference: "",
        status: "",
        type: "",
    });

    useEffect(() => {
        if (router.isReady) {
            const { reference, status, type } = router.query;

            // Store initial params
            setQueryParams({
                reference: reference || "",
                status: status || "",
                type: type || "",
            });

            // Fetch actual agreement status from Vipps
            if (reference) {
                const cleanId = String(reference).replace(/^agreement-/, "");
                checkVippsAgreementStatus(cleanId);
            } else {
                setLoading(false);
            }
        }
    }, [router.isReady, router.query]);

    // ✅ Remove "agreement-" prefix from reference
    const displayReference = queryParams.reference.replace(/^agreement-/, "");

    // ✅ Check the actual agreement status in Vipps
    const checkVippsAgreementStatus = async (agreementId) => {
        try {
            const response = await axios.get(`/api/checkVippsAgreementStatus?agreementId=${agreementId}`);
            const agreementStatus = response.data.status;

            console.log("🔹 Vipps Agreement Status:", agreementStatus);

            if (agreementStatus === "ACTIVE") {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.error("🚨 Error checking agreement status:", error);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (success && queryParams.reference) {
            sendConfirmationEmail(queryParams.reference);
        }
    }, [success, queryParams.reference]);
    
    const sendConfirmationEmail = async (agreementId) => {
        try {
            await axios.post("/api/sendSponsorshipEmail", {
                reference: agreementId,
            });
            console.log("✅ Sponsorship email sent successfully");
        } catch (error) {
            console.error("🚨 Error sending sponsorship email:", error);
        }
    };
    

    return (
        <>
            <NextHead title="Betaling fullført - Helping Hands" description="Takk for din støtte!" />
            <div className="kontakt">
                <div className="confirmation kontakt--padding">
                    {loading ? (
                        <p>Laster...</p>
                    ) : success ? (
                        <>
                            <h2>Tusen takk for ditt bidrag! 🧡</h2>
                            {/* {queryParams.type === "recurring" ? (
                                <p>Velkommen som fadder! 🧡  
                                Vi har registrert fadderavtalen din.</p>
                            ) : (
                                <p>Din betaling er mottatt. Tusen takk for din støtte! 🧡</p>
                            )} */}
                            {queryParams.type === "recurring" ? (
                                displayReference.startsWith("yearly-support-") ? (
                                    <p>Tusen takk for at du har blitt støttemedlem! 🧡  
                                    Din årlige støtte er registrert.</p>
                                ) : (
                                    <p>Velkommen som fadder! 🧡  
                                    Vi har registrert fadderavtalen din.</p>
                                )
                            ) : (
                                <p>Din betaling er mottatt. Tusen takk for din støtte! 🧡</p>
                            )}
                            <p>Referanse: <strong>{displayReference}</strong></p>
                            <p>Hvis du har spørsmål, ta kontakt med oss.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    ) : (
                        <>
                            <h2>Noe gikk galt 😟</h2>
                            <p>Vi kunne ikke bekrefte betalingen din.</p>
                            <p>Hvis beløpet er trukket, vennligst kontakt oss.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RedirectPage;
