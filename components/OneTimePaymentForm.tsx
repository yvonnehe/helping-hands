'use client';

import React, { useState, useEffect, useRef } from "react";
import NextHead from "../components/NextHead";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object({
    amount: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .positive("Beløpet må være positivt")
        .integer("Beløpet må være et heltall")
        .required("Beløp er påkrevd"),
    phoneNumber: yup.string()
        .matches(/^\d{8,15}$/, "Telefonnummeret må være gyldig")
        .required("Telefonnummer er påkrevd"),
}).required();

const OneTimePaymentForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const successMessageRef = useRef(null);
    const errorMessageRef = useRef(null);

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

    const initiatePayment = async (data: { amount: number; phoneNumber: string }) => {
        setIsSubmitting(true);

        try {
            const reference = `order-${Date.now()}`; // Generate unique reference
            const paymentType = "one-time"; // This is a one-time payment

            const isLocal = process.env.NODE_ENV === "development";
            const baseUrl = isLocal ? "http://localhost:3000" : "https://helpinghands.no";

            const returnUrl = `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=${paymentType}`;

            const response = await axios.post("/api/initiatePayment", {
                amount: data.amount * 100, // Convert to cents/øre
                phoneNumber: data.phoneNumber,
                reference: reference, // Pass reference
                returnUrl: returnUrl,
            });

            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl; // Redirect to Vipps payment page
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NextHead
                title="Engangsbetaling - Helping Hands"
                description="Betal enkelt og trygt med Vipps gjennom Helping Hands."
            />
            <div className="kontakt">
                <div className="container-fluid">
                    <div className="row kontakt--padding">
                        <div className="col-md-6">
                            <h2>Engangsbetaling</h2>
                            <h3 className="kontakt__h3">
                                Fyll inn beløp og telefonnummer for å betale via Vipps.
                            </h3>

                            {isSubmittedSuccessfully && (
                                <div role="alert" className="successMessage" tabIndex={-1} ref={successMessageRef}>
                                    Betalingsforespørselen ble sendt! Fullfør betalingen i Vipps.
                                </div>
                            )}
                            {isError && (
                                <div role="alert" className="errorMessageAlert" tabIndex={-1} ref={errorMessageRef}>
                                    Noe gikk galt. Vennligst prøv igjen.
                                </div>
                            )}

                            <form onSubmit={handleSubmit(initiatePayment)}>
                                {/* Amount Input */}
                                <div className="form-group">
                                    <label htmlFor="amount">Beløp (NOK)</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.amount ? "errorInput" : ""}`}
                                        id="amount"
                                        placeholder="200"
                                        {...register("amount")}
                                    />
                                    {errors.amount && <p className="errorMessage">{errors.amount.message}</p>}
                                </div>

                                {/* Phone Number Input */}
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Telefonnummer (MSISDN)</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phoneNumber ? "errorInput" : ""}`}
                                        id="phoneNumber"
                                        placeholder="4712345678"
                                        {...register("phoneNumber")}
                                    />
                                    {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn btn--form">
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
