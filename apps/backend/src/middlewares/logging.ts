import { type Request, type RequestHandler } from 'express'
import morgan from 'morgan'
import { env } from '@/env'

export const loggingMiddleware: RequestHandler =
  env.NODE_ENV === 'production'
    ? morgan('combined', {
        skip: (req: Request) => req.url === '/api/health',
      })
    : morgan('dev', {
        skip: (req: Request) => req.url === '/api/health',
      })
