'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextHead from "../components/NextHead";

const RedirectPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [queryParams, setQueryParams] = useState({
        reference: "",
        status: "",
        type: "",
    });

    useEffect(() => {
        if (router.isReady) {
            console.log("🔹 Router Query Params:", router.query); // Debugging

            const { reference, status, type } = router.query;

            setQueryParams({
                reference: reference || "",
                status: status || "",
                type: type || "",
            });

            setLoading(false);
        }
    }, [router.isReady, router.query]);

    // ✅ Ensure status is lowercase and remove any undefined values
    const status = queryParams.status?.toLowerCase() || "";

    // ✅ Determine success and failure states
    const isSuccess = status === "authorized";
    const isFailure = ["cancelled", "rejected", "failed"].includes(status);

    // ✅ Remove "agreement-" prefix from reference
    const displayReference = queryParams.reference.replace(/^agreement-/, "");

    return (
        <>
            <NextHead title="Betaling fullført - Helping Hands" description="Takk for din støtte!" />
            <div className="kontakt">
                <div className="confirmation kontakt--padding">
                    {loading ? (
                        <p>Laster...</p>
                    ) : isSuccess ? (
                        <>
                            <h2>Tusen takk for ditt bidrag! 🧡</h2>
                            {queryParams.type === "recurring" ? (
                                <p>Velkommen som fadder! 🧡  
                                Vi har registrert fadderavtalen din.</p>
                            ) : (
                                <p>Din betaling er mottatt. Tusen takk for din støtte! 🧡</p>
                            )}
                            <p>Referanse: <strong>{displayReference}</strong></p>
                            <p>Hvis du har spørsmål, ta kontakt med oss.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    ) : isFailure ? (
                        <>
                            <h2>Noe gikk galt 😟</h2>
                            <p>Vi kunne ikke bekrefte betalingen din.</p>
                            <p>Hvis beløpet er trukket, vennligst kontakt oss.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    ) : (
                        <>
                            <h2>Ukjent status 😕</h2>
                            <p>Noe uventet skjedde. Hvis du er usikker, ta kontakt med oss.</p>
                            <a href="/" className="sponsor-link sunshinelink">Tilbake til forsiden</a>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RedirectPage;
