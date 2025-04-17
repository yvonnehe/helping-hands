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
            const reference = typeof router.query.reference === "string" ? router.query.reference : "";
            const status = typeof router.query.status === "string" ? router.query.status : "";
            const type = typeof router.query.type === "string" ? router.query.type : "";

            setQueryParams({ reference, status, type });

            // ✅ Use Vipps agreementId from localStorage
            const vippsAgreementId = localStorage.getItem("vippsAgreementId");

            if ((type === "recurring" || type === "yearly-recurring") && vippsAgreementId) {
                checkVippsAgreementStatus(vippsAgreementId);
                // ⛔ DO NOT remove yet — we’ll remove it inside the check once successful
            } else {
                setLoading(false);
            }
        }
    }, [router.isReady, router.query]);

    const displayReference = queryParams.reference.replace(/^agreement-/, "");

    const checkVippsAgreementStatus = async (agreementId, attempt = 1) => {
        try {
            const response = await axios.get(`/api/checkVippsAgreementStatus?agreementId=${agreementId}`);
            const agreementStatus = response.data.status;
    
            if (agreementStatus === "ACTIVE") {
                setSuccess(true);
                localStorage.removeItem("vippsAgreementId");
            } else if (agreementStatus === "PENDING" && attempt < 5) {
                setTimeout(() => checkVippsAgreementStatus(agreementId, attempt + 1), 1000); // retry in 1s
            } else {
                setSuccess(false);
            }
        } catch (error) {
            if (attempt < 5) {
                setTimeout(() => checkVippsAgreementStatus(agreementId, attempt + 1), 1000); // retry on failure
            } else {
                setSuccess(false);
            }
        } finally {
            setLoading(false);
        }
    };    

    useEffect(() => {
        if (success) {
            sendConfirmationEmail();
        }
    }, [success]);

    const sendConfirmationEmail = async () => {
        try {
            const storedInfo = localStorage.getItem("sponsorshipInfo");
            if (!storedInfo) {
                console.warn("No sponsorship info found in localStorage");
                return;
            }

            const data = JSON.parse(storedInfo);

            await axios.post("/api/sendSponsorshipEmail", data);
            console.log("✅ Sponsorship email sent successfully");

            localStorage.removeItem("sponsorshipInfo"); // ✅ Clean up after sending
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
                            {queryParams.type === "yearly-recurring" ? (
                                <p>Tusen takk for at du har blitt støttemedlem! 🧡  
                                Din årlige støtte er registrert.</p>
                            ) : queryParams.type === "recurring" ? (
                                <p>Velkommen som fadder! 🧡  
                                Vi har registrert fadderavtalen din.</p>
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
                            <p className="mt-3">
                                Bruker du privat nettleservindu, annonseblokker eller VPN? Det kan føre til problemer med å bekrefte betalingen. 
                                Prøv gjerne igjen i et vanlig nettleservindu – eller ta kontakt med oss.
                            </p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RedirectPage;
