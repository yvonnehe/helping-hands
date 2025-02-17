'use client';

import React, { useState } from "react";
import NextHead from "../components/NextHead";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Step 2 Schema (Personal Info for Internal Use)
const step2Schema = yup.object({
    name: yup.string().required("Navn er påkrevd"),
    email: yup.string().email("Ugyldig e-post").required("E-post er påkrevd"),
    phoneNumber: yup.string()
        .test("isValidPhone", "Telefonnummeret må være gyldig", (value) => {
            if (!value) return false;
            const cleaned = value.replace(/\D/g, "");
            return cleaned.length === 8 || (cleaned.startsWith("47") && cleaned.length === 10);
        })
        .required("Telefonnummer er påkrevd"),
    address: yup.string().required("Adresse er påkrevd"),
    zipCode: yup.string().matches(/^\d{4,6}$/, "Postnummeret må være gyldig").required("Postnummer er påkrevd"),
    city: yup.string().required("Poststed er påkrevd"),
}).required();

const StottMedlem = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formattedPhone, setFormattedPhone] = useState("");
    const amount = 50; // Fixed yearly membership fee

    const step2Form = useForm({
        resolver: yupResolver(step2Schema),
        defaultValues: { name: "", email: "", phoneNumber: "", address: "", zipCode: "", city: "" }
    });

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormattedPhone(value);
        step2Form.setValue("phoneNumber", value);
    };

    const handleStep2Submit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const reference = `agreement-${Date.now()}`;
            const paymentType = "yearly";
            const isLocal = process.env.NODE_ENV === "development";
            const baseUrl = isLocal ? "http://localhost:3000" : "https://helpinghands.no";
            const returnUrl = `${baseUrl}/redirect?reference=${reference}&status=AUTHORIZED&type=${paymentType}`;

            console.log("Initiating Vipps yearly agreement with:", { reference, returnUrl, amount, phoneNumber: step2Form.getValues("phoneNumber").replace(/\D/g, "") });

            const response = await axios.post("/api/initiateYearlyPayment", {
                amount: amount * 100, // Convert to øre
                phoneNumber: step2Form.getValues("phoneNumber").replace(/\D/g, ""),
                reference,
                returnUrl,
            });

            if (response.data.agreementUrl) {
                console.log("Vipps agreement created successfully:", response.data.agreementUrl);
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
            <NextHead title="Bli støttemedlem - Helping Hands" description="Bli støttemedlem og støtt vårt arbeid årlig." />
            <div className="kontakt">
                <div className="container-fluid">
                    <div className="row kontakt--padding">
                        <div className="col-md-6">
                            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
                                <h2>Bli støttemedlem</h2>
                                <div className="selected-info-card">
                                    <p>Årlig medlemskap: <strong>50 NOK</strong></p>
                                </div>
                                <div className="form-group">
                                    <label>Navn</label>
                                    <input type="text" className="form-control" placeholder="Navn Navnesen" {...step2Form.register("name")} autoComplete="name" />
                                    {step2Form.formState.errors.name && <p className="errorMessage">{step2Form.formState.errors.name.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label>E-post</label>
                                    <input type="email" className="form-control" placeholder="dittnavn@epost.no" {...step2Form.register("email")} autoComplete="email" />
                                    {step2Form.formState.errors.email && <p className="errorMessage">{step2Form.formState.errors.email.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label>Telefonnummer</label>
                                    <input type="tel" className="form-control" placeholder="+47 XXX XX XXX" {...step2Form.register("phoneNumber")} value={formattedPhone} onChange={handlePhoneChange} autoComplete="tel" />
                                    {step2Form.formState.errors.phoneNumber && <p className="errorMessage">{step2Form.formState.errors.phoneNumber.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label>Adresse</label>
                                    <input type="text" className="form-control" placeholder="Gateadresse" {...step2Form.register("address")} autoComplete="address" />
                                    {step2Form.formState.errors.address && <p className="errorMessage">{step2Form.formState.errors.address.message}</p>}
                                </div>
                                <div className="form-group row form-postal">
                                    <div className="col-md-3 form-col-mobile">
                                        <label>Postnummer</label>
                                        <input type="text" className="form-control" placeholder="1234" {...step2Form.register("zipCode")} autoComplete="postal-code" />
                                        {step2Form.formState.errors.zipCode && <p className="errorMessage">{step2Form.formState.errors.zipCode.message}</p>}
                                    </div>
                                    <div className="col-md-9 form-col-mobile">
                                        <label>Poststed</label>
                                        <input type="text" className="form-control" placeholder="Bergen" {...step2Form.register("city")} autoComplete="address-level2" />
                                        {step2Form.formState.errors.city && <p className="errorMessage">{step2Form.formState.errors.city.message}</p>}
                                    </div>
                                </div>
                                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                                <button type="submit" className="btn btn--form" disabled={isSubmitting}>{isSubmitting ? "Behandler..." : "Bli støttemedlem med Vipps"}</button>
                                <div className="info-box">
                                    <p>Medlemskapet fornyes automatisk hvert år, og du kan når som helst avslutte medlemskapet.</p>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src="/Miriam1.jpg" alt="Miriam" className="selected-child-img" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StottMedlem;
