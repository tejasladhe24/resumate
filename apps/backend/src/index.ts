import express, { type Express } from "express"
import { createServer } from "http"
import apiRouter from "./routes"
import { middlewares } from "./middlewares"
import { errorHandlers } from "./errors"
import { gracefulShutdown } from "./lifecycle"
import { env } from "./env"

const app: Express = express()
app.set("trust proxy", 1)

// add middlewares
app.use(...middlewares)

// API routes
app.use("/api", apiRouter)

// add error handlers
app.use(...errorHandlers)

// Create HTTP server
const httpServer = createServer(app)

// Start server
httpServer.listen(env.PORT, env.HOST, () => {
  console.log(`🚀 Server is running on http://${env.HOST}:${env.PORT}`)
  console.log(`📊 Environment: ${env.NODE_ENV}`)
  console.log(`🔗 Health check: http://${env.HOST}:${env.PORT}/api/health`)
  console.log(`🔌 Socket.IO server ready`)
})

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown(httpServer, "SIGTERM"))
process.on("SIGINT", () => gracefulShutdown(httpServer, "SIGINT"))

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err)
  gracefulShutdown(httpServer, "uncaughtException")
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: unknown) => {
  console.error("Unhandled Rejection:", reason)
  gracefulShutdown(httpServer, "unhandledRejection")
})
