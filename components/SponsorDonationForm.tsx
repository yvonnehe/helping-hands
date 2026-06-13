'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import NextHead from "../components/NextHead";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { fadderbarnList } from "../data/fadderbarn";
import { buildSporingskode, SPORING_FORSLAG, SPORING_GENERELL } from "../utils/sporingskode";

const CONSENT_TEXT =
    "Jeg samtykker til at Helping Hands kan kontakte meg på e-post med informasjon om fadderbarnet mitt og arbeidet vårt.";

const VERDI_FORSLAG = "vart-forslag";
const VERDI_GENERELL = "manedlig-giver";

const step1Schema = yup.object({
    child: yup.string().required("Velg et fadderbarn"),
    amount: yup.number()
        .positive("Beløpet må være positivt")
        .integer("Beløpet må være et heltall")
        .required("Beløp er påkrevd"),
}).required();

const step2Schema = yup.object({
    name: yup.string().required("Navn er påkrevd"),
    email: yup.string().email("Ugyldig e-post").required("E-post er påkrevd"),
    phoneNumber: yup.string()
        .test("isValidPhone", "Telefonnummeret må være gyldig", (value) => {
            if (!value) return true; // valgfritt
            const cleaned = value.replace(/\D/g, "");
            return cleaned.length === 8 || (cleaned.startsWith("47") && cleaned.length === 10);
        })
        .notRequired(),
    consent: yup.boolean().oneOf([true], "Du må samtykke for å fortsette").required(),
}).required();

const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 8) {
        cleaned = `47${cleaned}`;
    } else if (cleaned.startsWith("47") && cleaned.length > 10) {
        cleaned = cleaned.substring(0, 10);
    }
    if (cleaned.length !== 10) return { cleaned, formatted: phone };
    return {
        cleaned,
        formatted: `+47 ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7)}`,
    };
};

const SponsorDonationForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formattedPhone, setFormattedPhone] = useState("");
    const detailsHeadingRef = useRef<HTMLHeadingElement>(null);

    const searchParams = useSearchParams();
    const child = searchParams.get("child") || "";
    const amount = searchParams.get("amount") ? parseInt(searchParams.get("amount") || "0", 10) : 200;

    const [selectedImage, setSelectedImage] = useState("");

    const step1Form = useForm({
        resolver: yupResolver(step1Schema),
        defaultValues: { child, amount },
    });

    const step2Form = useForm({
        resolver: yupResolver(step2Schema),
        defaultValues: { name: "", email: "", phoneNumber: "", consent: false },
    });

    useEffect(() => {
        if (child) step1Form.setValue("child", child);
        if (amount) step1Form.setValue("amount", amount);
    }, [child, amount, step1Form]);

    const selectedChild = step1Form.watch("child");

    useEffect(() => {
        if (selectedChild === VERDI_FORSLAG || selectedChild === VERDI_GENERELL) {
            setSelectedImage("");
            step1Form.setValue("amount", 200);
            return;
        }
        const selected = fadderbarnList.find((barn) => String(barn.id) === String(selectedChild));
        if (selected) {
            setSelectedImage(selected.image);
            step1Form.setValue("amount", selected.amount);
        }
    }, [selectedChild, step1Form]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormattedPhone(e.target.value);
        step2Form.setValue("phoneNumber", e.target.value);
    };

    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { cleaned, formatted } = formatPhoneNumber(e.target.value);
        setFormattedPhone(formatted);
        step2Form.setValue("phoneNumber", cleaned);
        step2Form.trigger("phoneNumber");
    };

    const handleStep1Submit = () => setStep(2);

    useEffect(() => {
        if (step === 2 && detailsHeadingRef.current) {
            detailsHeadingRef.current.focus();
        }
    }, [step]);

    const handleStep2Submit = async (data: any) => {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const childId = step1Form.getValues("child");
            const barn = fadderbarnList.find((b) => String(b.id) === String(childId));

            const reference = barn
                ? buildSporingskode(barn)
                : childId === VERDI_FORSLAG
                    ? SPORING_FORSLAG
                    : SPORING_GENERELL;

            await axios.post("/api/registerSponsor", {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber ? data.phoneNumber.replace(/\D/g, "") : null,
                childId,
                childName: barn?.name ?? childId,
                reference,
                suggestedAmount: step1Form.getValues("amount"),
                consent: true,
                consentText: CONSENT_TEXT,
                consentAt: new Date().toISOString(),
            });

            const params = new URLSearchParams({ ref: reference, name: barn?.name ?? "" });
            window.location.href = `/takk-fadder?${params.toString()}`;
        } catch (error) {
            console.error("Feil ved registrering:", error);
            setErrorMessage("En feil oppstod. Vennligst prøv igjen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NextHead title="Bli fadder - Helping Hands" description="Bli fadder og støtt et barn månedlig gjennom Helping Hands." />
            <div className="kontakt">
                <div className="container-fluid">
                    <div className="row kontakt--padding">
                        <div className="col-md-6">
                            {step === 1 ? (
                                <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} aria-labelledby="sponsorship-heading">
                                    <h2 id="sponsorship-heading" tabIndex={0}>Velg fadderbarn og beløp</h2>

                                    <div className="form-group">
                                        <label htmlFor="child">Fadderbarn</label>
                                        <select
                                            className="form-control"
                                            id="child"
                                            {...step1Form.register("child")}
                                            aria-describedby={step1Form.formState.errors.child ? "child-error" : undefined}
                                        >
                                            <option value="">Velg fadderbarn</option>
                                            <option value={VERDI_FORSLAG}>La oss komme med et forslag</option>
                                            <option value={VERDI_GENERELL}>Månedlig giver</option>
                                            {fadderbarnList.map((barn) => (
                                                <option key={barn.id} value={barn.id}>{barn.name}</option>
                                            ))}
                                        </select>
                                        {step1Form.formState.errors.child && (
                                            <p id="child-error" className="errorMessage">{step1Form.formState.errors.child.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="amount">Foreslått beløp (NOK)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            placeholder="200"
                                            {...step1Form.register("amount")}
                                            aria-describedby="amountHelp"
                                        />
                                        {step1Form.formState.errors.amount && (
                                            <p id="amount-error" className="errorMessage">{step1Form.formState.errors.amount.message}</p>
                                        )}
                                        <small id="amountHelp" className="form-text text-muted help-text-avtale">
                                            Du bekrefter og kan justere beløpet i Vipps.
                                        </small>
                                    </div>

                                    <button type="submit" className="btn btn--sponsor">Bli fadder med Vipps</button>

                                    <p>
                                        <a href="/bli-fadder" className="sponsor-link sunshinelink">
                                            Bli fadder med AvtaleGiro / Fast trekk
                                        </a>
                                    </p>
                                </form>
                            ) : (
                                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} aria-labelledby="details-heading">
                                    <h2 id="details-heading" tabIndex={0} ref={detailsHeadingRef}>Fyll inn dine opplysninger</h2>

                                    <div className="selected-info-card">
                                        <p>
                                            <strong>Ditt valg:</strong>{" "}
                                            {fadderbarnList.find((b) => String(b.id) === String(step1Form.getValues("child")))?.name ?? step1Form.getValues("child")}
                                            , {step1Form.getValues("amount")} NOK/mnd (foreslått)
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="name">Navn</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Navn Navnesen"
                                            {...step2Form.register("name")}
                                            autoComplete="name"
                                            aria-describedby={step2Form.formState.errors.name ? "name-error" : undefined}
                                        />
                                        {step2Form.formState.errors.name && (
                                            <p id="name-error" className="errorMessage">{step2Form.formState.errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">E-post</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="dittnavn@epost.no"
                                            {...step2Form.register("email")}
                                            autoComplete="email"
                                            aria-describedby={step2Form.formState.errors.email ? "email-error" : undefined}
                                        />
                                        {step2Form.formState.errors.email && (
                                            <p id="email-error" className="errorMessage">{step2Form.formState.errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Telefonnummer (valgfritt)</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="+47 XXX XX XXX"
                                            {...step2Form.register("phoneNumber")}
                                            value={formattedPhone}
                                            onChange={handlePhoneChange}
                                            onBlur={handlePhoneBlur}
                                            autoComplete="tel"
                                            aria-describedby={step2Form.formState.errors.phoneNumber ? "phoneNumber-error" : undefined}
                                        />
                                        {step2Form.formState.errors.phoneNumber && (
                                            <p id="phoneNumber-error" className="errorMessage">{step2Form.formState.errors.phoneNumber.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            className="form-check-input"
                                            {...step2Form.register("consent")}
                                            aria-describedby={step2Form.formState.errors.consent ? "consent-error" : undefined}
                                        />
                                        <label htmlFor="consent" className="form-check-label">{CONSENT_TEXT}</label>
                                        {step2Form.formState.errors.consent && (
                                            <p id="consent-error" className="errorMessage">{step2Form.formState.errors.consent.message}</p>
                                        )}
                                    </div>

                                    {errorMessage && (
                                        <p className="errorMessage" aria-live="assertive">{errorMessage}</p>
                                    )}

                                    <button type="submit" className="btn btn--form" disabled={isSubmitting}>
                                        {isSubmitting ? "Behandler..." : "Bli fadder med Vipps"}
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="col-md-6">
                            {selectedImage && (
                                <>
                                    <img src={selectedImage} className="selected-child-img" alt="Valgt fadderbarn" loading="lazy" decoding="async" />
                                    {(() => {
                                        const selected = fadderbarnList.find((barn) => String(barn.id) === String(step1Form.getValues("child")));
                                        return selected?.description ? (
                                            <p className="selected-child-description">{selected.description}</p>
                                        ) : null;
                                    })()}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorDonationForm;