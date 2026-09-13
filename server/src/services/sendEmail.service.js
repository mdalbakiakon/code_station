import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// generic email sending service (Brevo SMTP integration)
const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: process.env.BREVO_LOGIN,
                pass: process.env.BREVO_SMTP_KEY
            }
        });

        await transporter.sendMail({
            from: `"Code Station" <${process.env.BREVO_SENDER_EMAIL}>`,
            to,
            subject,
            html,
        });

    } catch (error) {
        console.log(error);
        throw new Error("failed to send email");
    }
}

export default sendEmail;