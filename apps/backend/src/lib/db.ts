import { env } from "@/env"
import { getDb } from "@workspace/pgdb"
import { createClient } from "@workspace/mongodb"

declare global {
  var __postgresDb: PostgresDb | undefined
  var __mongoDb: MongoDb | undefined
}

type MongoDb = ReturnType<typeof createClient>
type PostgresDb = ReturnType<typeof getDb>

export const postgresDb: PostgresDb =
  global.__postgresDb ??
  (global.__postgresDb = getDb({ url: env.POSTGRES_URL }))

export const mongoDb: MongoDb =
  global.__mongoDb ?? (global.__mongoDb = createClient(env.MONGODB_URL))

export * from "@workspace/pgdb"
export * from "@workspace/mongodb"
