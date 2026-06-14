import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Gi funksjonen mer tid på Vercel, så den ikke kuttes ved 10 sekunder.
export const config = { maxDuration: 30 };

type Body = {
    name: string;
    email: string;
    phoneNumber?: string | null;
    childId: string;
    childName: string;
    reference: string;
    suggestedAmount: number;
    consent: boolean;
    consentText: string;
    consentAt: string;
};

const FROM = `Helping Hands <${process.env.INFO_EMAIL}>`;

async function registerSponsorHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const body = req.body as Body;

    if (!body?.email || !body?.name || body?.consent !== true) {
        return res.status(400).json({ error: "Mangler navn, e-post eller samtykke" });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.INFO_EMAIL,
                pass: process.env.INFO_PASSWORD,
            },
            tls: {
                ciphers: "SSLv3",
            },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 8000,
        });

        // Intern e-post til teamet.
        const intern = transporter.sendMail({
            from: FROM,
            to: process.env.INFO_EMAIL,
            subject: `Ny fadderregistrering - ${body.name} (${body.reference})`,
            text: `
        Ny fadderregistrering via Vipps Donasjoner

        Navn: ${body.name}
        E-post: ${body.email}
        Telefonnummer: ${body.phoneNumber ?? "ikke oppgitt"}

        Fadderbarn: ${body.childName} (id ${body.childId})
        Referanse: ${body.reference}
        Foreslått beløp: ${body.suggestedAmount} kr/mnd

        Samtykke: ${body.consentText}
        Samtykket: ${body.consentAt}

        ----------------------------
        Avtalen opprettes av giveren i Vipps. Avstem den faktiske
        donasjonen mot referansen via Vipps Report-API.
      `,
        });

        // Bekreftelse til giveren.
        const bekreftelse = transporter.sendMail({
            from: FROM,
            to: body.email,
            subject: "Takk for at du vil bli fadder - Helping Hands",
            text: `Hei ${body.name},

Tusen takk for at du vil bli fadder for ${body.childName}.

Fullfør den faste donasjonen i Vipps for å sette avtalen i gang. Du velger selv beløp og trekkdato der.

Vi tar kontakt med informasjon om fadderbarnet ditt.

Varme hilsener
Helping Hands`,
        });

        // Send begge parallelt, så ventetiden halveres.
        await Promise.all([intern, bekreftelse]);

        return res.status(200).json({ message: "Registrering mottatt" });
    } catch (error: any) {
        console.error("registerSponsor feilet:", error);
        return res.status(500).json({ error: `Kunne ikke registrere: ${error.message}` });
    }
}

export default registerSponsorHandler;