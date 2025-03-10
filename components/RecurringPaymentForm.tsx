'use client';

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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
    phoneNumber: yup.string()
        .test("isValidPhone", "Telefonnummeret må være gyldig", (value) => {
            if (!value) return false;
            const cleaned = value.replace(/\D/g, ""); // Remove non-numeric characters
            return cleaned.length === 8 || (cleaned.startsWith("47") && cleaned.length === 10);
        })
        .required("Telefonnummer er påkrevd"),
    address: yup.string().required("Adresse er påkrevd"),
    zipCode: yup.string().matches(/^\d{4,6}$/, "Postnummeret må være gyldig").required("Postnummer er påkrevd"),
    city: yup.string().required("Poststed er påkrevd"),
}).required();

/**
 * Formats phone number to +47 XXX XX XXX for better readability.
 * Ensures numbers are sent to Vipps in the correct format (4799134073).
 */
const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, ""); // Remove all non-numeric characters

    if (cleaned.length === 8) {
        cleaned = `47${cleaned}`; // Prepend country code if missing
    } else if (cleaned.startsWith("47") && cleaned.length > 10) {
        cleaned = cleaned.substring(0, 10); // Trim excess characters
    }

    if (cleaned.length !== 10) return { cleaned, formatted: phone }; // Return as-is if incorrect length

    return {
        cleaned,
        formatted: `+47 ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7)}`
    };
};


const RecurringPaymentForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formattedPhone, setFormattedPhone] = useState("");
    const detailsHeadingRef = useRef<HTMLHeadingElement>(null);

    const searchParams = useSearchParams();
    const child = searchParams.get("child") || "";
    const amount = searchParams.get("amount") ? parseInt(searchParams.get("amount") || "0", 10) : 200;
    const image = searchParams.get("image") ? decodeURIComponent(searchParams.get("image") || "") : "";

    const [selectedImage, setSelectedImage] = useState(image);

    const step1Form = useForm({
        resolver: yupResolver(step1Schema),
        defaultValues: { child, amount }
    });

    const step2Form = useForm({
        resolver: yupResolver(step2Schema),
        defaultValues: { name: "", email: "", phoneNumber: "", address: "", zipCode: "", city: "" } // Ensure correct default values
    });

    const childImageMap: Record<string, string> = {
        "Mary": "/fadderbarn/helping-hands-mary.jpg",
        "Abdala": "/fadderbarn/helping-hands-abdala.jpg",
        "Salimu": "/fadderbarn/helping-hands-salimu.jpg",
        "Mahad": "/fadderbarn/helping-hands-mahad.jpg",
        "Ali (9)": "/fadderbarn/helping-hands-ali.jpg",  // Duplicate Ali
        "Esther": "/fadderbarn/helping-hands-esther.jpg",
        "Yahaya": "/fadderbarn/helping-hands-yahaya.jpg",
        "Kelvin": "/fadderbarn/helping-hands-kelvin.jpg",
        "Nordin": "/fadderbarn/helping-hands-nordin.jpg",
        "Sofia": "/fadderbarn/helping-hands-sofia.jpg",
        "Abdul": "/fadderbarn/helping-hands-abdul.jpg",
        "Bahati": "/fadderbarn/helping-hands-bahati.jpg",
        "Halima": "/fadderbarn/helping-hands-halima.jpg",
        "Jonelle": "/fadderbarn/helping-hands-jonelle.jpg",
        "Jasin": "/fadderbarn/helping-hands-jasin.jpg",
        "Norin": "/fadderbarn/helping-hands-norin.jpg",
        "Rashid": "/fadderbarn/helping-hands-rashid.jpg",
        "Ramla": "/fadderbarn/helping-hands-ramla.jpg",
        "Hadija": "/fadderbarn/helping-hands-hadija.jpg",
        "Jackson": "/fadderbarn/helping-hands-jackson.jpg",
        "Ali (12)": "/fadderbarn/helping-hands-ali2.jpg",  // Another duplicate Ali
        "Augusti": "/fadderbarn/helping-hands-augusti.jpg",
        "Alexi": "/fadderbarn/helping-hands-alexi.jpg",
        "Omar": "/fadderbarn/helping-hands-omar.jpg",
        "Jamal": "/fadderbarn/helping-hands-jamal.jpg",
        "Ramadhan (16)": "/fadderbarn/helping-hands-ramadhan.jpg",
        "Marthina": "/fadderbarn/helping-hands-marthina.jpg",
        "Amina": "/fadderbarn/helping-hands-amina.jpg",
        "Ramadhan (20)": "/fadderbarn/helping-hands-ramadhan2.jpg",  // Duplicate Ramadhan
        "Hawa": "/fadderbarn/helping-hands-hawa.jpg",
        "Ndelekwa": "/ndelekwa.jpg"
    };

    const childAmountMap: Record<string, number> = {
        "Mary": 150,
        "Abdala": 100,
        "Salimu": 100,
        "Mahad": 100,
        "Ali (9)": 100,
        "Esther": 100,
        "Yahaya": 100,
        "Kelvin": 100,
        "Nordin": 100,
        "Sofia": 150,
        "Abdul": 150,
        "Bahati": 500,
        "Halima": 480,
        "Jonelle": 100,
        "Jasin": 150,
        "Norin": 100,
        "Rashid": 150,
        "Ramla": 680,
        "Hadija": 50,
        "Jackson": 50,
        "Ali (12)": 50,
        "Augusti": 150,
        "Alexi": 50,
        "Omar": 100,
        "Jamal": 100,
        "Ramadhan (16)": 100,
        "Marthina": 100,
        "Amina": 650,
        "Ramadhan (20)": 700,
        "Hawa": 150,
        "Ndelekwa": 200
    };

    useEffect(() => {
        if (child) step1Form.setValue("child", child);
        if (amount) step1Form.setValue("amount", amount);
    }, [child, amount, step1Form]);

    const selectedChild = step1Form.watch("child");

    useEffect(() => {
        if (selectedChild === "vårt-forslag" || selectedChild === "månedlig-giver") {
            setSelectedImage(""); // Reset image if "vårt-forslag" is selected
            step1Form.setValue("amount", 200); // Default amount
        } else if (selectedChild && childImageMap[selectedChild]) {
            setSelectedImage(childImageMap[selectedChild]);
        }

        // Set the default amount based on the selected child
        if (selectedChild && childAmountMap[selectedChild]) {
            step1Form.setValue("amount", childAmountMap[selectedChild]);
        }
    }, [selectedChild]);


    // Handle live formatting of phone number input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormattedPhone(value);
        step2Form.setValue("phoneNumber", value);
    };

    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { cleaned, formatted } = formatPhoneNumber(e.target.value);
        setFormattedPhone(formatted);
        step2Form.setValue("phoneNumber", cleaned); // Store cleaned version for submission
        step2Form.trigger("phoneNumber"); // Ensure validation updates correctly
    };

    const handleStep1Submit = (data) => {
        console.log("Step 1 Data:", data);
        setStep(2);
    };

    // fix focus when changing to step 2 
    useEffect(() => {
        if (step === 2 && detailsHeadingRef.current) {
            detailsHeadingRef.current.focus();
        }
    }, [step]);

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
                phoneNumber: step2Form.getValues("phoneNumber").replace(/\D/g, ""),
            });

            // 🔹 Initiate Vipps recurring agreement (DO NOT SEND CHILD INFO TO VIPPS)
            const response = await axios.post("/api/initiatePayment", {
                amount: step1Form.getValues("amount") * 100, // Convert to øre
                phoneNumber: step2Form.getValues("phoneNumber").replace(/\D/g, ""),
                reference: reference,
                returnUrl: returnUrl,
                paymentType: paymentType,
                child: step1Form.getValues("child")
            });

            if (response.data.agreementUrl) {
                console.log("Vipps agreement created successfully:", response.data.agreementUrl);

                // 🔹 Send internal sponsorship email
                await axios.post("/api/sendSponsorshipEmail", {
                    name: data.name,
                    email: data.email,
                    phoneNumber: step2Form.getValues("phoneNumber").replace(/\D/g, ""),
                    address: data.address,
                    zipCode: data.zipCode,
                    child: step1Form.getValues("child"), // Only included in email
                    amount: step1Form.getValues("amount"),
                });

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
            <div className="kontakt">
                <div className="container-fluid">
                    <div className="row kontakt--padding">
                        <div className="col-md-6">
                            {step === 1 ? (
                                <form
                                    onSubmit={step1Form.handleSubmit(handleStep1Submit)}
                                    aria-labelledby="sponsorship-heading"
                                >
                                    {/* Hidden Live Region for Screen Readers */}
                                    <p aria-live="polite" className="sr-only">
                                        You are on the sponsorship selection form.
                                    </p>

                                    <h2 id="sponsorship-heading" tabIndex={0}>Velg fadderbarn og beløp</h2>

                                    {/* Sponsored Child Selection */}
                                    <div className="form-group">
                                        <label htmlFor="child">Fadderbarn</label>
                                        <select
                                            className="form-control"
                                            id="child"
                                            {...step1Form.register("child")}
                                            aria-describedby={step1Form.formState.errors.child ? "child-error" : undefined}
                                        >
                                            <option value="">Velg fadderbarn</option>
                                            <option value="vårt-forslag">La oss komme med et forslag</option>
                                            <option value="månedlig-giver">Månedlig giver</option>
                                            <option value="Mary">Mary</option>
                                            <option value="Abdala">Abdala</option>
                                            <option value="Ali (9)">Ali (9)</option>
                                            <option value="Salimu">Salimu</option>
                                            <option value="Mahad">Mahad</option>
                                            <option value="Ali (12)">Ali (12)</option>
                                            <option value="Esther">Esther</option>
                                            <option value="Yahaya">Yahaya</option>
                                            <option value="Kelvin">Kelvin</option>
                                            <option value="Nordin">Nordin</option>
                                            <option value="Sofia">Sofia</option>
                                            <option value="Abdul">Abdul</option>
                                            <option value="Bahati">Bahati</option>
                                            <option value="Halima">Halima</option>
                                            <option value="Jonelle">Jonelle</option>
                                            <option value="Jasin">Jasin</option>
                                            <option value="Norin">Norin</option>
                                            <option value="Rashid">Rashid</option>
                                            <option value="Ramla">Ramla</option>
                                            <option value="Hadija">Hadija</option>
                                            <option value="Jackson">Jackson</option>
                                            <option value="Ali">Ali</option>
                                            <option value="Augusti">Augusti</option>
                                            <option value="Alexi">Alexi</option>
                                            <option value="Omar">Omar</option>
                                            <option value="Jamal">Jamal</option>
                                            <option value="Ramadhan (16)">Ramadhan (16)</option>
                                            <option value="Marthina">Marthina</option>
                                            <option value="Amina">Amina</option>
                                            <option value="Ramadhan (20)">Ramadhan (20)</option>
                                            <option value="Hawa">Hawa</option>
                                            <option value="Ndelekwa">Ndelekwa</option>
                                        </select>
                                        {step1Form.formState.errors.child && (
                                            <p id="child-error" className="errorMessage">
                                                {step1Form.formState.errors.child.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Amount Input */}
                                    <div className="form-group">
                                        <label htmlFor="amount">Beløp (NOK)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            placeholder="200"
                                            {...step1Form.register("amount")}
                                            aria-describedby="amountHelp"
                                        />
                                        {step1Form.formState.errors.amount && (
                                            <p id="amount-error" className="errorMessage">
                                                {step1Form.formState.errors.amount.message}
                                            </p>
                                        )}
                                        <small id="amountHelp" className="form-text text-muted help-text-avtale">
                                            Eller skriv inn valgfritt beløp.
                                        </small>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn--sponsor">
                                        Bli fadder med Vipps
                                    </button>

                                    {/* Alternative Payment Option */}
                                    <p>
                                        <a href="/bli-fadder" className="sponsor-link sunshinelink">
                                            Bli fadder med AvtaleGiro / Fast trekk
                                        </a>
                                    </p>
                                </form>
                            ) : (
                                <form
                                    onSubmit={step2Form.handleSubmit(handleStep2Submit)}
                                    aria-labelledby="details-heading"
                                >
                                    {/* Hidden Live Region for Screen Readers */}
                                    <p aria-live="polite" className="sr-only">
                                        You are on the details form.
                                    </p>

                                    <h2 id="details-heading" tabIndex={0} ref={detailsHeadingRef}>Fyll inn dine opplysninger</h2>

                                    {/* ✅ Display selected child & amount in step 2 (for user reference) */}
                                    <div className="selected-info-card">
                                        <p>
                                            <strong>Ditt valg:</strong> {step1Form.getValues("child")}, {step1Form.getValues("amount")} NOK/mnd
                                        </p>
                                    </div>

                                    {/* Name Input */}
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
                                            <p id="name-error" className="errorMessage">
                                                {step2Form.formState.errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Input */}
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
                                            <p id="email-error" className="errorMessage">
                                                {step2Form.formState.errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number Input */}
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Telefonnummer</label>
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
                                            <p id="phoneNumber-error" className="errorMessage">
                                                {step2Form.formState.errors.phoneNumber.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Address Input */}
                                    <div className="form-group">
                                        <label htmlFor="address">Adresse</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Gateadresse"
                                            {...step2Form.register("address")}
                                            autoComplete="address"
                                            aria-describedby={step2Form.formState.errors.address ? "address-error" : undefined}
                                        />
                                        {step2Form.formState.errors.address && (
                                            <p id="address-error" className="errorMessage">
                                                {step2Form.formState.errors.address.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Zip Code and City Inputs */}
                                    <div className="form-group row form-postal">
                                        <div className="col-md-3 form-col-mobile">
                                            <label htmlFor="zipCode">Postnummer</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="zipCode"
                                                placeholder="1234"
                                                {...step2Form.register("zipCode")}
                                                autoComplete="postal-code"
                                                aria-describedby={step2Form.formState.errors.zipCode ? "zipCode-error" : undefined}
                                            />
                                            {step2Form.formState.errors.zipCode && (
                                                <p id="zipCode-error" className="errorMessage">
                                                    {step2Form.formState.errors.zipCode.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-md-9 form-col-mobile">
                                            <label htmlFor="city">Poststed</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                placeholder="Bergen"
                                                {...step2Form.register("city")}
                                                autoComplete="address-level2"
                                                aria-describedby={step2Form.formState.errors.city ? "city-error" : undefined}
                                            />
                                            {step2Form.formState.errors.city && (
                                                <p id="city-error" className="errorMessage">
                                                    {step2Form.formState.errors.city.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Error Message for Submission Issues */}
                                    {errorMessage && (
                                        <p className="errorMessage" aria-live="assertive">
                                            {errorMessage}
                                        </p>
                                    )}

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn--form" disabled={isSubmitting}>
                                        {isSubmitting ? "Behandler..." : "Bekreft"}
                                    </button>
                                </form>
                            )}
                        </div>
                        <div className="col-md-6">
                            {selectedImage && <img src={selectedImage} className="selected-child-img" alt="Valgt fadderbarn" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecurringPaymentForm;
