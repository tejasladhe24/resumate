import { config } from "dotenv"
import z from "zod"

config({
  path: "../.env",
  debug: true,
})

export const env = z
  .object({
    SELF_URL: z.url(),
    APP_UI_URL: z.url(),
    POSTGRES_URL: z.url(),
    MONGODB_URL: z.url(),
    INNGEST_DEV: z.url(),
    INNGEST_EVENT_KEY: z.string().min(1),

    PORT: z.coerce.number().default(8000),
    HOST: z.string().default("0.0.0.0"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  })
  .parse({
    SELF_URL: process.env.SELF_URL,
    APP_UI_URL: process.env.APP_UI_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    INNGEST_DEV: process.env.INNGEST_DEV,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,

    PORT: process.env.PORT,
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
  })
