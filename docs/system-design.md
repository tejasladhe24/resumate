# Resumate System Design (MVP -> Scalable)

## 1) Goal and Scope

Resumate helps users tailor resumes to a target job description (JD).

MVP goals:

- User can authenticate, upload/paste resume + JD, trigger processing, and get:
  - parsed JD
  - parsed CV
  - match analysis
  - rewritten resume
  - score comparison (old vs new)
- Asynchronous heavy tasks run in Inngest.
- UI remains responsive and can poll/stream job status.

Non-goals for MVP:

- Full collaborative editor
- Multi-template PDF rendering pipeline
- Complex billing/metering

---

## 2) Current Repo Boundaries (as implemented)

- `apps/web`
  - Next.js app
  - Better Auth integration
  - UI + auth/session
  - Has Inngest client (`resumate-web`) for emitting events
- `apps/backend`
  - Express API app
  - Inngest function handler endpoint: `/api/inngest`
  - Contains async workflow functions (`src/lib/inngest.ts`)
- `packages/pgdb`
  - PostgreSQL schema package (currently auth-centric)
- `packages/mongodb`
  - MongoDB validation schemas for resume/JD/AI output documents
- `docker-compose.yml`
  - local Postgres + MongoDB + Inngest dev server

Design principle:

- Keep request/response UX and auth in `web`.
- Keep CPU/LLM/vector-heavy background work in `backend` via Inngest.

---

## 3) High-Level Architecture

### Runtime components

1. **Web App (Next.js)**
   - Handles login/session with Better Auth.
   - Accepts user inputs (resume, JD, options).
   - Creates a generation request record and emits Inngest events.
   - Reads progress/results and renders output.

2. **Backend API (Express)**
   - Exposes Inngest serve endpoint for function execution.
   - Optionally hosts internal service endpoints (parse/score/version retrieval).
   - Owns orchestration code and business logic execution.

3. **Inngest Dev/Cloud**
   - Event bus + durable workflow runtime.
   - Handles retries, step-level observability, and fan-out/fan-in.

4. **PostgreSQL**
   - Source of truth for relational state:
     - users, requests/jobs, statuses, version metadata, quotas.

5. **MongoDB**
   - Flexible document storage:
     - raw uploads
     - parsed CV/JD
     - generated resume JSON
     - analysis payloads and explainability details.

### Data ownership split

- **Postgres**: transactional and query-heavy relational data.
- **MongoDB**: evolving structured/unstructured resume and NLP artifacts.

---

## 4) Recommended MVP User Flow

1. User logs in (or guest).
2. User submits:
   - source resume (text/file)
   - target JD
   - optional tone/seniority constraints
3. `web` creates a `generation_request` (status: `queued`) in Postgres.
4. `web` emits Inngest event `resume/generation.requested` with request id + user id.
5. Inngest backend workflow executes stages:
   - JD parsing
   - CV parsing
   - matching/scoring on original CV
   - CV rewriting
   - rescoring
6. Each stage updates status/progress + persists artifacts.
7. `web` polls by request id (or subscribes via SSE/WebSocket later).
8. User sees:
   - improved resume JSON/text
   - score delta and rationale
   - failure reason + retry action when needed.

---

## 5) Inngest Workflow Design

Current functions in `apps/backend/src/lib/inngest.ts`:

- `jd-processing`
- `cv-processing`
- `match-processing` (currently duplicated trigger/id issue)
- `cv-generation`
- `scoring`

For MVP scalability and idempotency, use one parent orchestration event plus optional child events:

### Event contracts (recommended)

- `resume/generation.requested`
  - payload: `{ requestId, userId, resumeSourceRef, jdSourceRef, options }`
- `resume/stage.completed`
  - payload: `{ requestId, stage, artifactRefs, metrics }`
- `resume/stage.failed`
  - payload: `{ requestId, stage, errorCode, message, retryable }`

### Stage sequence

1. **parse-jd**
2. **parse-cv**
3. **analyze-original-match**
4. **generate-tailored-cv**
5. **analyze-new-match**
6. **finalize-request**

### Reliability rules

- Every stage must be idempotent by `(requestId, stage)`.
- Store stage checkpoints in Postgres.
- Inngest retries enabled for transient failures (LLM/network).
- Mark hard failures terminal with actionable error code.

---

## 6) Data Model (MVP)

### Postgres (new product tables alongside auth tables)

1. `generation_requests`
   - `id` (pk)
   - `user_id`
   - `status` (`queued|running|completed|failed|cancelled`)
   - `current_stage`
   - `error_code`, `error_message`
   - `created_at`, `updated_at`, `completed_at`

2. `generation_stages`
   - `id`
   - `request_id`
   - `stage_name`
   - `status`
   - `attempt`
   - `started_at`, `finished_at`
   - unique `(request_id, stage_name, attempt)`

3. `resume_versions`
   - `id`
   - `request_id`
   - `kind` (`original|generated`)
   - `mongo_document_id`
   - `score_overall`
   - `created_at`

4. `usage_events` (optional for MVP, useful early)
   - `id`, `user_id`, `request_id`, `event_type`, `units`, `created_at`

### MongoDB documents

Leverage the existing schemas:

- `resumeSchema`
- `jobDescriptionSchema`
- `aiGeneratedResumeSchema`

Recommended collection split:

- `resumes` (raw + parsed original CV)
- `job_descriptions` (raw + parsed JD)
- `generated_resumes` (rewrites + old/new match analysis)

Keep document references in Postgres for query/filter UX.

---

## 7) API Surface (MVP)

Owned by `apps/web` route handlers or `apps/backend` endpoints (choose one owner per route; avoid duplicate ownership):

- `POST /api/resume-requests`
  - create request + emit Inngest start event
- `GET /api/resume-requests/:id`
  - status + stage progress + summary metrics
- `GET /api/resume-requests/:id/result`
  - generated resume + scores + rationale
- `POST /api/resume-requests/:id/retry`
  - retrigger from failed stage if retryable

Auth:

- Require authenticated/guest session from Better Auth.
- Authorize by `user_id` ownership.

---

## 8) Security and Compliance Baseline

- Never send raw auth cookies to backend jobs; pass stable user/request ids only.
- Encrypt secrets in env and keep separate keys for dev/prod Inngest.
- Redact PII in logs (email, phone, full resume raw).
- Add request-level audit trail (who triggered, when, from where).
- Rate-limit request creation to control abuse/cost.

---

## 9) Observability

MVP telemetry to add immediately:

- Correlation id = `requestId` across web logs, backend logs, and Inngest steps.
- Stage duration metrics and fail counts.
- Success rate and p95 end-to-end completion time.
- Token/cost usage per generation (if LLM provider supports it).

Operational dashboards:

- Queue depth (queued vs running)
- Failure reasons by stage
- Average score delta (original -> generated)

---

## 10) Scalability Path (after MVP)

1. **Execution**
   - Split monolithic functions into stage-specific workers.
   - Parallelize independent enrichments (skills extraction, keyword extraction, etc.).

2. **Storage**
   - Add vector indexes (pgvector or dedicated vector DB) for semantic match quality.
   - Add cold storage for large raw files.

3. **Product**
   - Resume version history + rollback
   - Multiple target JDs per base resume
   - Team/organization workspaces

4. **Platform**
   - Move from Inngest dev to managed env with per-env event keys.
   - Add dead-letter handling and automated replay tools.

---

## 11) Immediate Code-Level Adjustments Suggested

1. In `apps/backend/src/lib/inngest.ts`, fix duplicate function id/trigger:
   - `matchProcessing` currently uses id `"cv-processing"` and event `"cv/processing"`.
   - It should have a unique id/event (example: `"match-processing"` + `"match/processing"`).

2. Standardize event names under one namespace:
   - Prefer `resume/...` domain naming to avoid drift.

3. Introduce a single orchestration function:
   - Parent function triggered by `resume/generation.requested`, which calls stage helpers with `step.run`.

4. Add persistent request tables in `packages/pgdb` before UX completion:
   - This unblocks status/progress UI even with basic frontend.

---

## 12) MVP Acceptance Criteria

- User can submit CV + JD and receive a generated tailored resume.
- End-to-end flow is asynchronous and resilient to transient failure.
- Progress/status is queryable per request.
- Old vs new scoring is persisted and visible.
- System supports at least N concurrent jobs (define N for launch) without request loss.

This design keeps your current architecture direction intact (`web` for auth/UI, `backend` for Inngest workflows) while giving a clear path from prototype to production-grade scale.
