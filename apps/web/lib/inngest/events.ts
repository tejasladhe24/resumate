export const EVENTS = {
  RESUME_UPDATED: "resume/updated",
  PARSE_RESUME_REQUESTED: "resume/parse.requested",

  JD_CREATED: "jd/created",
  JD_UPDATED: "jd/updated",
  PARSE_JD_REQUESTED: "jd/parse.requested",

  RESUME_PARSED: "resume/parsed",
  JD_PARSED: "jd/parsed",

  MATCH_COMPUTED: "match/computed",
  COMPUTE_MATCH_REQUESTED: "match/compute.requested",

  GENERATE_RESUME_REQUESTED: "resume/generate.requested",
  RESUME_GENERATED: "resume/generated",
} as const
