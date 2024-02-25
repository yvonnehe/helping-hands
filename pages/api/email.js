import nodemailer from 'nodemailer';

async function sendEmailHandler(req, res) {
  try {
    const { email, name, fadderbarn, amount, comment, fasttrekk, avtalegiro } = await req.body;

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.MY_EMAIL,
    //     pass: process.env.MY_PASSWORD
    //   }
    // });

    // Configure the transporter for Office 365
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com", // Office 365 server
      port: 587, // SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.INFO_EMAIL, // Your email address
        pass: process.env.INFO_PASSWORD, // Your password or app password if 2FA is enabled
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    const mailOptions = {
      from: process.env.INFO_EMAIL,
      to: process.env.INFO_EMAIL,
      subject: `Melding fra ${name} (${email})`,
      text: `
        Navn: ${name},
        E-post: ${email},
        Fadderbarn: ${fadderbarn},
        Beløp: ${amount},
        Kommentar: ${comment},
        Fast trekk: ${fasttrekk},
        AvtaleGiro: ${avtalegiro}`,
    };

    // Sending email and awaiting the response
    await transporter.sendMail(mailOptions);
    
    // Return success response directly using res object
    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    // Return error response if there's an issue
    // Log the error and return an error response directly using res object
    console.error("Failed to send email:", err);
    res.status(500).json({ error: `Failed to send email: ${err.message}` });
  }
}

export default sendEmailHandler;