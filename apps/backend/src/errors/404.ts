import { type Request, type Response } from 'express'

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    requestId: req.headers['x-request-id'],
  })
}
