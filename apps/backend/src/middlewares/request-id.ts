import { type Request, type Response, type NextFunction } from 'express'

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = crypto.randomUUID()
  req.headers['x-request-id'] = requestId
  res.setHeader('X-Request-Id', requestId)
  next()
}
