import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    SELF_URL: z.url().min(10),
    AUTH_SECRET: z.string().min(5),
    AUTH_DOMAIN: z.string().min(5),
    POSTGRES_URL: z.url().min(10),
    MONGODB_URL: z.url().min(10),
    MONGODB_DB_NAME: z.string().min(1),
    CHROMA_URL: z.url().min(10),

    RESEND_API_KEY: z.string().min(10),
    EMAIL_SENDER_NAME: z.string().min(1),
    EMAIL_SENDER_ADDRESS: z.email(),

    INNGEST_DEV: z.url().min(10),
    INNGEST_EVENT_KEY: z.string().min(1),

    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_REGION: z.string().min(1),
    S3_ENDPOINT: z.url().min(10),
    S3_BUCKET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SELF_URL: z.url().min(10),
    NEXT_PUBLIC_BACKEND_URL: z.url().min(10),
  },
  runtimeEnv: {
    // server
    SELF_URL: process.env.SELF_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    POSTGRES_URL: process.env.POSTGRES_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    CHROMA_URL: process.env.CHROMA_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,
    EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,

    INNGEST_DEV: process.env.INNGEST_DEV,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_BUCKET: process.env.S3_BUCKET,
    // client
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_SELF_URL: process.env.NEXT_PUBLIC_SELF_URL,
  },
})
