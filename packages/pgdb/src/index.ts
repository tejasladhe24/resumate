export * from "./schema.js"
export * from "./utils.js"

import { schema } from "./schema.js"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

export function getDb({ url }: { url?: string }) {
  return drizzle(
    new Pool({ connectionString: url ?? process.env.DATABASE_URL }),
    { schema }
  )
}
