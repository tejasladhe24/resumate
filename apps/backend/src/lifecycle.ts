import { type Server } from 'http'

export async function gracefulShutdown(
  server: Server,
  signal: string,
  cleanup?: () => Promise<void>
) {
  console.log(`\n${signal} received. Starting graceful shutdown...`)

  try {
    if (cleanup) await cleanup()
  } catch (error) {
    console.error('Shutdown cleanup error:', error)
  }

  server.close(() => {
    console.log('HTTP server closed.')
  })

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout')
    process.exit(1)
  }, 10000)
}
