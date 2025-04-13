import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

async function sendSponsorshipEmailHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { name, email, phoneNumber, address, child, amount } = req.body;

        // Configure Nodemailer transporter for Office 365
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.INFO_EMAIL, // Your email
                pass: process.env.INFO_PASSWORD, // Your password or app password
            },
            tls: {
                ciphers: "SSLv3",
            },
        });

        const mailOptions = {
            from: process.env.INFO_EMAIL,
            to: process.env.INFO_EMAIL, // Internal email (sent to yourself)
            subject: `Ny fadder registrering - ${name}`,
            text: `
        🔹 Ny fadderregistrering via Vipps 🔹
        
        👤 Navn: ${name}
        📧 E-post: ${email}
        📱 Telefonnummer: ${phoneNumber}
        🏠 Adresse: ${address}
        📍 Poststed: ${address.postalCode}, ${address.city}

        👶 Fadderbarn: ${child}
        💰 Månedlig beløp: ${amount} NOK

        ----------------------------
        Sjekk Vipps for bekreftelse av betalingsavtale.
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Success response
        res.status(200).json({ message: "Sponsorship email sent successfully" });
    } catch (error: any) {
        console.error("Failed to send sponsorship email:", error);
        res.status(500).json({ error: `Failed to send email: ${error.message}` });
    }
}

export default sendSponsorshipEmailHandler;
