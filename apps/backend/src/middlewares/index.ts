import { json, urlencoded, type RequestHandler } from 'express'

import { corsMiddleware } from './cors'
import { compressionMiddleware } from './compression'
import { securityMiddleware } from './security'
import { loggingMiddleware } from './logging'
import { rateLimitMiddleware } from './rate-limit'
import { requestIdMiddleware } from './request-id'

export const middlewares: RequestHandler[] = [
  securityMiddleware,
  corsMiddleware,
  compressionMiddleware,
  json({ limit: '10mb' }),
  urlencoded({ extended: true, limit: '10mb' }),
  loggingMiddleware,
  rateLimitMiddleware,
  requestIdMiddleware,
]

export {
  corsMiddleware,
  compressionMiddleware,
  securityMiddleware,
  loggingMiddleware,
  rateLimitMiddleware,
  requestIdMiddleware,
}
