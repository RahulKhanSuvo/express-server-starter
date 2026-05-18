import dotenv from "dotenv";
import z from "zod";
import AppError from "../app/errorsHelpers/AppError";
import status from "http-status";
dotenv.config();
const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRE_IN: z.string().default("1d"),
  REFRESH_TOKEN_EXPIRE_IN: z.string().default("7d"),
  BATTER_AUTH_SESSION_EXPIRE_IN: z.string().default("7d"),
  BATTER_AUTH_SESSION_TOKEN_UPDATA_AGE: z.string().default("1d"),
  EMAIL_SENDER_SMTP_USER: z.string(),
  EMAIL_SENDER_SMTP_PASS: z.string(),
  EMAIL_SENDER_SMTP_HOST: z.string(),
  EMAIL_SENDER_SMTP_PORT: z.coerce.number().default(465),
  EMAIL_SENDER_SMTP_FROM: z.string(),
  FRONTEND_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  SUPER_ADMIN_EMAIL: z.string(),
  SUPER_ADMIN_PASSWORD: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.issues);
  throw new AppError(
    status.INTERNAL_SERVER_ERROR,
    "Invalid environment variables",
    parsedEnv.error,
  );
}
const envConfig = parsedEnv.data;

export default envConfig;
