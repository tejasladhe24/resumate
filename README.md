# Resumate

Resumate is a Next.js monorepo app that helps users create tailored resumes for specific job descriptions using AI.

The workflow is:

1. User signs in.
2. User creates a profile by uploading a base resume.
3. User adds one or more job descriptions.
4. AI generates tailored resume points for each job description to improve relevance and selection chances.

## Monorepo Structure

- `apps/web`: Next.js application (UI, routes, API handlers, auth integration).
- `packages/ui`: Shared UI component library.
- `packages/mongodb`: MongoDB schema and query helpers for resume and job description data.
- `packages/pgdb`: PostgreSQL schema and database utilities (auth-related storage).
- `packages/typescript-config`: Shared TypeScript configuration.

## Core Technologies

- **Framework**: Next.js (App Router)
- **Authentication**: Better Auth
- **Background jobs**: Inngest
- **Relational database**: PostgreSQL (auth database)
- **Document database**: MongoDB (resumes and job descriptions)
- **Monorepo tooling**: Turborepo + pnpm workspaces

## Prerequisites

- Node.js `>=20`
- pnpm `9+`
- Docker (for local infra services)

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start local infrastructure (PostgreSQL, MongoDB, Inngest dev server):

```bash
docker compose up -d
```

3. Start all app/package dev processes:

```bash
pnpm dev
```

## Environment Variables

Create a root `.env` file with values required by:

- PostgreSQL (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`)
- MongoDB (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`)
- Inngest (`INNGEST_EVENT_KEY`)
- App-level auth/DB variables used by `apps/web`

Use your existing local `.env` as the source of truth for exact variable names and values.

## Useful Commands

- `pnpm dev`: Run all workspace dev tasks
- `pnpm build`: Build all workspaces
- `pnpm lint`: Run lint checks
- `pnpm typecheck`: Run TypeScript checks
- `pnpm format`: Run formatting
