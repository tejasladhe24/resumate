import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core"
import { timestamps } from "./utils.js"

export const $user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  isAnonymous: boolean("isAnonymous").default(false).notNull(),
  ...timestamps,
})

export type PGUser = typeof $user.$inferSelect

export const $session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => $user.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [index("session_user_id_idx").on(table.userId)]
)

export type PGSession = typeof $session.$inferSelect

export const $account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => $user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("account_user_id_idx").on(table.userId)]
)

export type PGAccount = typeof $account.$inferSelect

export const $verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    ...timestamps,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

export type PGVerification = typeof $verification.$inferSelect

export const $jwks = pgTable("jwks", {
  id: text("id").primaryKey(),
  publicKey: text("publicKey").notNull(),
  privateKey: text("privateKey").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type PGJWKS = typeof $jwks.$inferSelect

export const $generationRequestStatus = pgEnum("generationRequestStatus", [
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
])

export type PGGenerationRequestStatus =
  (typeof $generationRequestStatus.enumValues)[number]

export const $generationRequest = pgTable("generationRequest", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => $user.id, { onDelete: "cascade" }),
  status: $generationRequestStatus("status").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type PGGenerationRequest = typeof $generationRequest.$inferSelect

export const $generationStage = pgTable(
  "generationStage",
  {
    id: text("id").primaryKey(),
    requestId: text("requestId")
      .notNull()
      .references(() => $generationRequest.id, { onDelete: "cascade" }),
    stage: text("stage").notNull(),
    attempt: integer("attempt").notNull().default(0),
    startedAt: timestamp("startedAt"),
    finishedAt: timestamp("finishedAt"),
  },
  (table) => [
    unique("unique_generation_stage_request_id_stage_attempt").on(
      table.requestId,
      table.stage,
      table.attempt
    ),
  ]
)

export type PGGenerationStage = typeof $generationStage.$inferSelect

export const $resumeVersion = pgTable("resumeVersion", {
  id: text("id").primaryKey(),
  requestId: text("requestId")
    .notNull()
    .references(() => $generationRequest.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(),
  mongoDocumentId: text("mongoDocumentId").notNull(),
  scoreOverall: integer("scoreOverall").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type PGResumeVersion = typeof $resumeVersion.$inferSelect

export const schema = {
  //auth
  user: $user,
  session: $session,
  account: $account,
  verification: $verification,
  jwks: $jwks,
}
