'use client';

import React, { useState } from "react";
import NextHead from "../components/NextHead";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Step 1 Schema (Child Selection)
const step1Schema = yup.object({
    child: yup.string().required("Velg et fadderbarn"),
    amount: yup.number()
        .positive("Beløpet må være positivt")
        .integer("Beløpet må være et heltall")
        .required("Beløp er påkrevd"),
}).required();

// Step 2 Schema (Personal Info for Internal Use)
const step2Schema = yup.object({
    name: yup.string().required("Navn er påkrevd"),
    email: yup.string().email("Ugyldig e-post").required("E-post er påkrevd"),
    phoneNumber: yup.string().matches(/^\d{8,15}$/, "Telefonnummeret må være gyldig").required("Telefonnummer er påkrevd"),
    address: yup.string().required("Adresse er påkrevd"),
    zipCode: yup.string().matches(/^\d{4,6}$/, "Postnummeret må være gyldig").required("Postnummer er påkrevd"),
}).required();

const RecurringPaymentForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const step1Form = useForm({ resolver: yupResolver(step1Schema) });
    const step2Form = useForm({ resolver: yupResolver(step2Schema) });

    const handleStep1Submit = (data) => {
        console.log("Step 1 Data:", data);
        setStep(2);
    };

    const handleStep2Submit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const reference = `agreement-${Date.now()}`; // Unique reference for recurring payment
            const paymentType = "recurring"; // This is a recurring payment

            const isLocal = process.env.NODE_ENV === "development";
            const baseUrl = isLocal ? "http://localhost:3000" : "https://helpinghands.no";

            const returnUrl = `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=${paymentType}`;

            console.log("Initiating Vipps agreement with:", {
                reference,
                returnUrl,
                amount: step1Form.getValues("amount") * 100,
                phoneNumber: data.phoneNumber,
            });

            // 🔹 Initiate Vipps recurring agreement (DO NOT SEND CHILD INFO TO VIPPS)
            const response = await axios.post("/api/initiatePayment", {
                amount: step1Form.getValues("amount") * 100, // Convert to øre
                phoneNumber: data.phoneNumber,
                reference: reference,
                returnUrl: returnUrl,
                paymentType: paymentType,
                child: step1Form.getValues("child")
            });

            if (response.data.agreementUrl) {
                console.log("Vipps agreement created successfully:", response.data.agreementUrl);

                // ✅ Temporarily commenting out internal email sending logic
                /*
                await axios.post("/api/sendSponsorshipEmail", {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    zipCode: data.zipCode,
                    child: step1Form.getValues("child"), // Only included in email
                    amount: step1Form.getValues("amount"),
                });
                */

                // 🔹 Redirect user to Vipps to confirm the agreement
                window.location.href = response.data.agreementUrl;
            } else {
                console.error("Error: No agreement URL received");
                setErrorMessage("Kunne ikke opprette avtale. Vennligst prøv igjen.");
            }
        } catch (error) {
            console.error("Error initiating agreement:", error.response?.data || error.message);
            setErrorMessage("En feil oppstod. Vennligst prøv igjen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NextHead title="Bli fadder - Helping Hands" description="Bli fadder og støtt et barn månedlig gjennom Helping Hands." />
            <div className="container">
                {step === 1 ? (
                    <form onSubmit={step1Form.handleSubmit(handleStep1Submit)}>
                        <h2>Velg fadderbarn og beløp</h2>
                        <div className="form-group">
                            <label>Fadderbarn</label>
                            <select className="form-control" {...step1Form.register("child")}>
                                <option value="">Velg et fadderbarn</option>
                                <option value="Mary">Mary</option>
                                <option value="Ali">Ali</option>
                            </select>
                            {step1Form.formState.errors.child && <p className="errorMessage">{step1Form.formState.errors.child.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Beløp (NOK)</label>
                            <input type="number" className="form-control" placeholder="200" {...step1Form.register("amount")} />
                            {step1Form.formState.errors.amount && <p className="errorMessage">{step1Form.formState.errors.amount.message}</p>}
                        </div>

                        <button type="submit" className="btn btn--form">Neste</button>
                    </form>
                ) : (
                    <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
                        <h2>Fyll inn dine opplysninger</h2>

                        {/* ✅ Display selected child & amount in step 2 (for user reference) */}
                        <div className="selected-info">
                            <p><strong>Fadderbarn:</strong> {step1Form.getValues("child")}</p>
                            <p><strong>Beløp:</strong> {step1Form.getValues("amount")} NOK</p>
                            <p><strong>Månedlig giver</strong></p>
                        </div>

                        <div className="form-group">
                            <label>Navn</label>
                            <input type="text" className="form-control" placeholder="Navn Navnesen" {...step2Form.register("name")} />
                            {step2Form.formState.errors.name && <p className="errorMessage">{step2Form.formState.errors.name.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>E-post</label>
                            <input type="email" className="form-control" placeholder="din.email@eksempel.no" {...step2Form.register("email")} />
                            {step2Form.formState.errors.email && <p className="errorMessage">{step2Form.formState.errors.email.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Telefonnummer</label>
                            <input type="text" className="form-control" placeholder="4712345678" {...step2Form.register("phoneNumber")} />
                            {step2Form.formState.errors.phoneNumber && <p className="errorMessage">{step2Form.formState.errors.phoneNumber.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Adresse</label>
                            <input type="text" className="form-control" placeholder="Gateadresse" {...step2Form.register("address")} />
                            {step2Form.formState.errors.address && <p className="errorMessage">{step2Form.formState.errors.address.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Postnummer</label>
                            <input type="text" className="form-control" placeholder="1234" {...step2Form.register("zipCode")} />
                            {step2Form.formState.errors.zipCode && <p className="errorMessage">{step2Form.formState.errors.zipCode.message}</p>}
                        </div>

                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                        <button type="submit" className="btn btn--form" disabled={isSubmitting}>
                            {isSubmitting ? "Behandler..." : "Bekreft"}
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default RecurringPaymentForm;
