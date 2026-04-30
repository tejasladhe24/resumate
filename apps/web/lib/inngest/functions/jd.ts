import { inngest } from "@/lib/inngest"
import { EVENTS } from "../events"
import { eventType } from "inngest"
import z from "zod"

export const parseJobDescription = inngest.createFunction(
  {
    id: "jd-parse-request",
    triggers: [
      eventType(EVENTS.PARSE_JD_REQUESTED, {
        schema: z.object({
          jdId: z.string(),
          userId: z.string(),
        }),
      }),
    ],
  },
  async ({ event, step }) => {
    const { jdId, userId } = event.data

    // 1. Fetch JD
    const jd = await step.run("fetch-jd", async () => {
      // TODO: fetch JD from DB
    })

    // 2. Normalize content
    const normalized = await step.run("normalize-jd", async () => {
      // TODO: clean raw JD text
    })

    // 3. Parse JD using AI
    const parsed = await step.run("parse-jd", async () => {
      // TODO: extract requirements, responsibilities, etc.
    })

    // 4. Extract keywords
    const keywords = await step.run("extract-keywords", async () => {
      // TODO: keyword extraction
    })

    // 5. Generate embeddings
    const embeddings = await step.run("generate-embeddings", async () => {
      // TODO: generate embeddings for JD
    })

    // 6. Save parsed JD
    await step.run("save-parsed-jd", async () => {
      // TODO: update jd.parsed + meta
    })

    // 7. Emit parsed event
    await step.sendEvent("emit-jd-parsed", {
      name: EVENTS.JD_PARSED,
      data: { jdId, userId },
    })
  }
)
