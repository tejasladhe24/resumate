# `@workspace/pgdb`

Shared Drizzle schema/types package for the meeting domain.

## Includes

- Auth tables (`user`, `session`, `account`, `verification`, `jwks`)
- Meeting tables (`meet`, `meet_member`, `meet_variant`)
- Schema + utility exports
- `getDb()` helper

## Important Files

- `src/schema.ts`
- `src/utils.ts`
- `drizzle.config.ts`
- `migrations/`

## Scripts

```bash
pnpm --filter @workspace/pgdb build
pnpm --filter @workspace/pgdb typecheck
```
