import { inngest } from "@/lib/inngest"
import { EVENTS } from "../events"
import { eventType } from "inngest"
import z from "zod"

export const computeMatch = inngest.createFunction(
  {
    id: "match-compute-request",
    triggers: [
      eventType(EVENTS.COMPUTE_MATCH_REQUESTED, {
        schema: z.object({
          jdId: z.string(),
          userId: z.string(),
          resumeId: z.string(),
        }),
      }),
    ],
  },
  async ({ event, step }) => {
    const { jdId, userId, resumeId } = event.data

    // 1. Fetch JD
    const jd = await step.run("fetch-jd", async () => {
      // TODO
    })

    // 2. Fetch user's resume
    const resume = await step.run("fetch-user-resume", async () => {
      // TODO
    })

    // 3. Compute match score
    const matchScore = await step.run("compute-match-score", async () => {
      // TODO
    })

    // 4. Store match insights
    await step.run("store-match-result", async () => {
      // TODO: save score, gaps, strengths
    })

    // 7. Emit match computed
    await step.sendEvent("emit-match-computed", {
      name: EVENTS.MATCH_COMPUTED,
      data: {
        jdId,
        userId,
        resumeId,
      },
    })
  }
)
