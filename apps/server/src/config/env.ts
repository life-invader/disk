import { z } from "zod";
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string("JWT secret string is requierd"),
  FILE_PATH: z.string("FILE_PATH string is requierd"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsedEnv.error.issues);
  process.exit(1);
}

export const env = parsedEnv.data;