import { inngest } from "@/lib/inngest"
import { EVENTS } from "../events"
import { z } from "zod"
import { eventType } from "inngest"

export const parseResume = inngest.createFunction(
  {
    id: "resume-parse-request",
    triggers: [
      eventType(EVENTS.PARSE_RESUME_REQUESTED, {
        schema: z.object({
          resumeId: z.string(),
          userId: z.string(),
        }),
      }),
    ],
  },
  async ({ event, step }) => {
    const { resumeId, userId } = event.data

    // 1. Fetch resume from DB
    const resume = await step.run("fetch-resume", async () => {
      // TODO: fetch resume using DAO
    })

    // 2. Normalize raw content (strip HTML, clean text, etc.)
    const normalized = await step.run("normalize-resume", async () => {
      // TODO: normalize raw.content
    })

    // 3. Parse resume using AI
    const parsed = await step.run("parse-resume", async () => {
      // TODO: call AI (Vercel AI SDK) to extract structured data
    })

    // 4. Extract skills (optional separate step)
    const skills = await step.run("extract-skills", async () => {
      // TODO: derive/enrich skills from parsed data
    })

    // 5. Generate embeddings
    const embeddings = await step.run("generate-embeddings", async () => {
      // TODO: generate vector embeddings
    })

    // 6. Save parsed result
    await step.run("save-parsed-resume", async () => {
      // TODO: update resume.parsed + meta
    })

    // 7. Emit parsed event
    await step.sendEvent("emit-resume-parsed", {
      name: EVENTS.RESUME_PARSED,
      data: { resumeId, userId },
    })
  }
)

export const generateResume = inngest.createFunction(
  {
    id: "resume-generate-request",
    triggers: [
      eventType(EVENTS.GENERATE_RESUME_REQUESTED, {
        schema: z.object({
          jdId: z.string(),
          userId: z.string(),
          preferences: z.string(),
        }),
      }),
    ],
  },
  async ({ event, step }) => {
    const { jdId, userId, preferences } = event.data

    // 1. Fetch resume
    const resume = await step.run("fetch-resume", async () => {
      // TODO
    })

    // 2. Fetch JD
    const jd = await step.run("fetch-jd", async () => {
      // TODO
    })

    // 3. Fetch match insights
    const match = await step.run("fetch-match", async () => {
      // TODO
    })

    // 4. Build prompt context
    const prompt = await step.run("build-prompt", async () => {
      // TODO:
      // combine resume + JD + match + preferences
    })

    // 5. Generate tailored resume
    const generated = await step.run("generate-resume", async () => {
      // TODO: call AI
    })

    // 6. Post-process (formatting, sections, etc.)
    const formatted = await step.run("format-output", async () => {
      // TODO
    })

    // 7. Save generated resume
    await step.run("save-generated-resume", async () => {
      // TODO
    })

    // 8. Emit event
    await step.sendEvent("emit-resume-generated", {
      name: EVENTS.RESUME_GENERATED,
      data: { jdId, resumeId: resume.id, userId },
    })
  }
)
