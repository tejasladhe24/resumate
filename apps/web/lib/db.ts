import { env } from "@/env"
import { getPgDb } from "@workspace/pgdb"

declare global {
  var __postgresDb: PostgresDb | undefined
}

type PostgresDb = ReturnType<typeof getPgDb>

export const postgresDb: PostgresDb =
  global.__postgresDb ??
  (global.__postgresDb = getPgDb({ url: env.POSTGRES_URL }))

export * from "@workspace/pgdb"
