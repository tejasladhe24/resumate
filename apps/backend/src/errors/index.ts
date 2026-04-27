import { notFoundHandler } from './404'
import { globalErrorHandler } from './global'

export const errorHandlers = [notFoundHandler, globalErrorHandler]

export { notFoundHandler, globalErrorHandler }
