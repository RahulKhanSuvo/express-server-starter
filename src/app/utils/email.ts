import nodemailer from "nodemailer";
import envConfig from "../../config/env";

const transporter = nodemailer.createTransport({
  host: envConfig.EMAIL_SENDER_SMTP_HOST,
  port: envConfig.EMAIL_SENDER_SMTP_PORT,
  secure: true,
  auth: {
    user: envConfig.EMAIL_SENDER_SMTP_USER,
    pass: envConfig.EMAIL_SENDER_SMTP_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: envConfig.EMAIL_SENDER_SMTP_FROM,
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
export const EmailUtils = {
  sendEmail,
};
