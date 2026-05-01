import dotenv from "dotenv";
import z from "zod";
dotenv.config();
const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.issues);
  throw new Error("Invalid environment variables");
}

const envConfig = parsedEnv.data;

export default envConfig;
