import { Inngest } from "inngest"

// Create a client to send and receive events
export const inngest = new Inngest({ id: "resumate-express" })

const jdProcessing = inngest.createFunction(
  { id: "jd-processing", triggers: [{ event: "jd/processing" }] },
  async ({ event, step }) => {
    /**
     * Extract skills, keywords, and role expectations
     * - skills
     * - keywords
     * - role expectations
     */
    console.log(event)
    return { message: `JD Processing` }
  }
)

const cvProcessing = inngest.createFunction(
  { id: "cv-processing", triggers: [{ event: "cv/processing" }] },
  async ({ event, step }) => {
    /**
     * Parse existing resume into structured format
     * - name
     * - email
     * - phone
     * - address
     * - summary
     * - experience
     * - skills
     */
    console.log(event)
    return { message: `CV Processing` }
  }
)

const matchProcessing = inngest.createFunction(
  { id: "cv-processing", triggers: [{ event: "cv/processing" }] },
  async ({ event, step }) => {
    /**
     * Job Matching:
     * - Keyword Overlap
     * - Embedding Similarity
     *
     * Optional:
     * - Job Requirements Fulfillment
     * - Skills Matching
     * - Experience Relevance (years, industries, roles)
     * - Education Relevance (degrees, schools, majors)
     * - Certifications Relevance (types, issuers)
     * - Awards and Achievements Relevance (types, organizations)
     * - Projects Relevance (types, organizations)
     * - Publications Relevance (types, organizations)
     */

    console.log(event)
    return { message: `CV Processing` }
  }
)

const cvGeneration = inngest.createFunction(
  { id: "cv-generation", triggers: [{ event: "cv/generation" }] },
  async ({ event, step }) => {
    /**
     * LLM rewrites:
     * - summary
     * - experience
     * - skills
     * Bullet transformation:
     * - raw → impact-driven
     */
    console.log(event)
    return { message: `CV Generation` }
  }
)

const scoring = inngest.createFunction(
  { id: "scoring", triggers: [{ event: "scoring" }] },
  async ({ event, step }) => {
    /**
     * ATS-style scoring:
     * - keyword match %
     * - semantic similarity
     * - readability
     */
    console.log(event)
    return { message: `Scoring` }
  }
)

export const functions = [
  jdProcessing,
  cvProcessing,
  matchProcessing,
  cvGeneration,
  scoring,
]
