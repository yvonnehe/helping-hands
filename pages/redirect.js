// IKKE I BRUK ELLER KUN TIL ÅRLIGE DONASJONER
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextHead from "../components/NextHead";
import axios from "axios";

const RedirectPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [queryParams, setQueryParams] = useState({
        reference: "",
        status: "",
        type: "",
    });

    useEffect(() => {
        if (!router.isReady) return;
        
        const reference = typeof router.query.reference === "string" ? router.query.reference : "";
        const type = typeof router.query.type === "string" ? router.query.type : "";
        console.log("Query params:", { reference, type });

        setQueryParams({ reference, type });

        if ((type === "recurring" || type === "yearly-recurring")) {
            const vippsAgreementId = localStorage.getItem("vippsAgreementId");
            checkVippsAgreementStatus(vippsAgreementId);
        } else {
            setLoading(false);
        }
    }, [router.isReady, router.query]);

    // ✅ Remove "agreement-" prefix from reference
    const displayReference = queryParams.reference.replace(/^agreement-/, "");

    // ✅ Check the actual agreement status in Vipps
    const checkVippsAgreementStatus = async (initialAgreementId, attempt = 1) => {
        let agreementId = initialAgreementId;
    
        // 🔁 Fallback: look up from temp server store if missing
        if (!agreementId && queryParams.reference) {
            try {
                const lookupResponse = await axios.get(`/api/lookupAgreementId?reference=${queryParams.reference}`);
                agreementId = lookupResponse.data.agreementId;
                console.log("✅ Retrieved agreementId from temp store:", agreementId);
            } catch (err) {
                console.warn("⚠️ Could not retrieve agreementId from server memory:", err);
                setSuccess(false);
                setLoading(false);
                return;
            }
        }

        if (!agreementId) {
            console.warn("⚠️ Still no agreementId");
            setSuccess(false);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`/api/checkVippsAgreementStatus?agreementId=${agreementId}`);
            const agreementStatus = response.data.status;
            console.log("✅ Agreement status:", agreementStatus);
            setStatusMessage(agreementStatus);
    
            if (agreementStatus === "ACTIVE") {
                setSuccess(true);
                localStorage.removeItem("vippsAgreementId");

                let amount, interval, productName;
                try {
                    const initResponse = await axios.get(`/api/lookupInitData?reference=${queryParams.reference}`);
                    ({ amount, interval, productName } = initResponse.data);
                } catch (error) {
                    console.error("❌ Failed to load initial data from Redis:", error);
                    setSuccess(false);
                    return;
                }

                await axios.post("/api/saveAgreementInfo", {
                    agreementId,
                    reference: queryParams.reference,
                    type: queryParams.type,
                    amount,
                    interval,
                    productName
                });
            } else if (["STOPPED", "EXPIRED"].includes(agreementStatus)) {
                setSuccess(false);
            } else if (agreementStatus === "PENDING" && attempt < 5) {
                setTimeout(() => checkVippsAgreementStatus(agreementId, attempt + 1), 1000);
                return;
            } else {
                setSuccess(false);
            }
        } catch (err) {
            console.error("❌ Error checking agreement status:", err);
            if (attempt < 5) {
                setTimeout(() => checkVippsAgreementStatus(agreementId, attempt + 1), 1000);
                return;
            }
            setSuccess(false);
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

            // Persist owner mapping on server so we can attach name/email to logs and records
            try {
                await axios.post('/api/storeSponsorshipInfo', {
                    reference: queryParams.reference,
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });
                console.log('🔐 Stored sponsorship owner info on server');
            } catch (err) {
                console.warn('⚠️ Failed to persist sponsorship owner info:', err);
            }

            await axios.post("/api/sendSponsorshipEmail", data);
            console.log("✅ Sponsorship email sent successfully");

            localStorage.removeItem("sponsorshipInfo");
            await axios.post("/api/cleanupAgreementReference", {
                reference: queryParams.reference,
            });
        } catch (error) {
            console.error("🚨 Error sending sponsorship email:", error);
        }
    };

    return (
        <>
            <NextHead
                title={
                    statusMessage === "STOPPED"
                        ? "Betaling avbrutt - Helping Hands"
                        : statusMessage === "EXPIRED"
                        ? "Betaling utløpt - Helping Hands"
                        : "Betaling fullført - Helping Hands"
                }
                description={
                    statusMessage === "STOPPED"
                        ? "Vipps-avtalen ble avbrutt."
                        : statusMessage === "EXPIRED"
                        ? "Vipps-avtalen utløp før den ble fullført."
                        : "Takk for din støtte!"
                }
            />
            <div className="kontakt">
                <div className="confirmation kontakt--padding">
                    {loading ? (
                        <p>Laster...</p>
                    ) : statusMessage === "STOPPED" ? (
                        <>
                            <h2>Betalingen ble avbrutt</h2>
                            <p>Du avbrøt Vipps-avtalen.</p>
                            <p>Ingen betaling er trukket. Du kan prøve igjen når som helst.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    ) : statusMessage === "EXPIRED" ? (
                        <>
                            <h2>Avtalen er utløpt</h2>
                            <p>Vipps-avtalen ble ikke fullført i tide og har utløpt.</p>
                            <p>Du kan prøve igjen når som helst.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
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
                            <h2>Tusen takk for ditt bidrag! 🧡</h2>
                            <p>Vi setter stor pris på at du støtter arbeidet vårt.<br />  
                            Sammen skaper vi en forskjell! 🧡</p>
                            <p>Hvis du har spørsmål, ta kontakt med oss.</p>
                            {/* FEILMELDING FUNKER IKKE */}
                            {/* <h2>Noe gikk galt 😟</h2>
                            <p>Vi kunne ikke bekrefte betalingen din.</p>
                            <p className="vipps-error-info">
                                Sjekk gjerne Vipps-appen for å se om betalingen gikk gjennom.  
                                Hvis den gjorde det, trenger du ikke gjøre noe mer – men ta gjerne kontakt med oss hvis du er usikker.
                            </p> */}
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RedirectPage;
