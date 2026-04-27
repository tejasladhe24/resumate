import { env } from '@/env'
import cors from 'cors'

export const corsMiddleware = cors({
  origin: env.APP_UI_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
})
