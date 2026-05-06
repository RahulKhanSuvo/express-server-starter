/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import envConfig from "../../config/env";
import AppError from "../errorsHelpers/AppError";
import status from "http-status";
import path from "path";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: envConfig.EMAIL_SENDER_SMTP_HOST,
  port: envConfig.EMAIL_SENDER_SMTP_PORT,
  secure: true,
  auth: {
    user: envConfig.EMAIL_SENDER_SMTP_USER,
    pass: envConfig.EMAIL_SENDER_SMTP_PASS,
  },
});
interface sendEmailType {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}
const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: sendEmailType) => {
  try {
    const templatePath = path.resolve(
      process.cwd(),
      `src/app/templates/${templateName}.ejs`,
    );
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envConfig.EMAIL_SENDER_SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
    console.log("Email sent successfully", info);
    return info;
  } catch (error) {
    console.error("❌ Error while sending email", error);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "❌ Error while sending email",
    );
  }
};
export const EmailUtils = {
  sendEmail,
};
