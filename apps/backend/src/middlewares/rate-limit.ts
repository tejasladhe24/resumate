import rateLimit from 'express-rate-limit'
import { type Request } from 'express'

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req: Request) => {
    const skipRoutes = ['/api/health', '/api/auth']
    const isSkipRoute = skipRoutes.some((route) => req.url.startsWith(route))
    return isSkipRoute
  },
})
