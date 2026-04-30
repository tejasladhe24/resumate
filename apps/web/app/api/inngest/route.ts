import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest"
import { parseResume, generateResume } from "@/lib/inngest/functions/resume"
import { parseJobDescription } from "@/lib/inngest/functions/jd"
import { computeMatch } from "@/lib/inngest/functions/match"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [parseResume, parseJobDescription, computeMatch, generateResume],
})
