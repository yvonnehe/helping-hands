'use client';

import React, { useState, useEffect, useRef } from "react";
import NextHead from "../components/NextHead";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Funksjon for å formatere telefonnumre
const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, ""); // Fjern ikke-numeriske tegn

    if (cleaned.length === 8) {
        cleaned = `47${cleaned}`; // Legg til landskode hvis mangler
    } else if (cleaned.startsWith("47") && cleaned.length > 10) {
        cleaned = cleaned.substring(0, 10); // Trim overflødige tegn
    }

    if (cleaned.length !== 10) return { cleaned, formatted: phone }; // Returner uendret hvis feil lengde

    return {
        cleaned,
        formatted: `+47 ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7)}`
    };
};

// Validation Schema
const schema = yup.object({
    amount: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .positive("Beløpet må være positivt")
        .integer("Beløpet må være et heltall")
        .required("Beløp er påkrevd"),
    phoneNumber: yup.string()
        .test("isValidPhone", "Telefonnummeret må være gyldig", (value) => {
            if (!value) return false;
            const cleaned = value.replace(/\D/g, "");
            return cleaned.length === 8 || (cleaned.startsWith("47") && cleaned.length === 10);
        })
        .required("Telefonnummer er påkrevd"),
}).required();

const OneTimePaymentForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formattedPhone, setFormattedPhone] = useState("");

    const successMessageRef = useRef<HTMLDivElement>(null);
    const errorMessageRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (isSubmittedSuccessfully && successMessageRef.current) {
            successMessageRef.current.focus();
        }
    }, [isSubmittedSuccessfully]);

    useEffect(() => {
        if (isError && errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [isError]);

    // Håndter telefonnummer-input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormattedPhone(value);
        setValue("phoneNumber", value);
    };

    // Formater telefonnummer ved tap av fokus
    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { cleaned, formatted } = formatPhoneNumber(e.target.value);
        setFormattedPhone(formatted);
        setValue("phoneNumber", cleaned);
        trigger("phoneNumber");
    };

    const initiatePayment = async (data: { amount: number; phoneNumber: string }) => {
        setIsSubmitting(true);
        setIsSubmittedSuccessfully(false);
        setIsError(false);

        try {
            const reference = `order-${Date.now()}`; // Generer unik referanse
            const paymentType = "one-time"; // Engangsbetaling

            const isLocal = process.env.NODE_ENV === "development";
            const baseUrl = isLocal ? "http://localhost:3000" : "https://helpinghands.no";

            const returnUrl = `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=${paymentType}`;

            const response = await axios.post("/api/initiatePayment", {
                amount: data.amount * 100, // Konverter til øre
                phoneNumber: data.phoneNumber.replace(/\D/g, ""), // Send renset nummer
                reference: reference,
                returnUrl: returnUrl,
            });

            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl; // Omdiriger til Vipps-betalingssiden
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error("Feil ved betaling:", error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NextHead
                title="Engangsbetaling - Helping Hands"
                description="Støtt barn og ungdom med Vipps gjennom Helping Hands."
            />
            <div className="kontakt">
                <div className="container-fluid">
                    <div className="row kontakt--padding">
                        <div className="col-md-6">
                            <h2 tabIndex={0}>Engangsbetaling</h2>
                            <h3 className="kontakt__h3">
                                Fyll inn beløp og telefonnummer for å betale via Vipps.
                            </h3>

                            {isSubmittedSuccessfully && (
                                <div
                                    role="alert"
                                    className="successMessage"
                                    tabIndex={-1}
                                    ref={successMessageRef}
                                    aria-live="polite"
                                >
                                    Betalingsforespørselen ble sendt! Fullfør betalingen i Vipps.
                                </div>
                            )}
                            {isError && (
                                <div
                                    role="alert"
                                    className="errorMessageAlert"
                                    tabIndex={-1}
                                    ref={errorMessageRef}
                                    aria-live="assertive"
                                >
                                    Noe gikk galt. Vennligst prøv igjen.
                                </div>
                            )}

                            <form onSubmit={handleSubmit(initiatePayment)} ref={formRef}>
                                {/* Amount Input */}
                                <div className="form-group">
                                    <label htmlFor="amount">Beløp (NOK)</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.amount ? "errorInput" : ""}`}
                                        id="amount"
                                        name="amount"
                                        placeholder="200"
                                        {...register("amount")}
                                        aria-describedby={errors.amount ? "amount-error" : undefined}
                                    />
                                    {errors.amount && (
                                        <p id="amount-error" className="errorMessage" role="alert">
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number Input */}
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Telefonnummer</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phoneNumber ? "errorInput" : ""}`}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="+47 XXX XX XXX"
                                        {...register("phoneNumber")}
                                        value={formattedPhone}
                                        onChange={handlePhoneChange}
                                        onBlur={handlePhoneBlur}
                                        aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                                    />
                                    {errors.phoneNumber && (
                                        <p id="phone-error" className="errorMessage" role="alert">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="btn btn--form"
                                    disabled={isSubmitting}
                                    aria-disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Behandler..." : "Betal med Vipps"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneTimePaymentForm;
