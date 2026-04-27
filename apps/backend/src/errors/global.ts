import { type Request, type Response, type NextFunction } from 'express'
import { env } from '@/env'

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Don't log errors in test environment
  if (env.NODE_ENV !== 'test') {
    console.error('Error:', {
      message: err.message,
      stack: env.NODE_ENV === 'development' ? err.stack : undefined,
      path: req.path,
      method: req.method,
      requestId: req.headers['x-request-id'],
    })
  }

  // Don't send error response if headers already sent
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = (err as any).statusCode || 500
  const message =
    env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal Server Error'
      : err.message

  res.status(statusCode).json({
    error: message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    requestId: req.headers['x-request-id'],
  })
}
