import z from "zod"

const baseResumeSchema = z.object({
  headline: z.string().min(1),
  summary: z.string().min(1),
  experience: z.array(
    z.object({
      company: z.string().min(1),
      role: z.string().min(1),
      location: z.string().min(1),
      points: z.array(z.string().min(1)),
      startDate: z.date(),
      endDate: z.date(),
    })
  ),
  skills: z.array(z.string().min(1)),
  education: z.array(
    z.object({
      school: z.string().min(1),
      degree: z.string().min(1),
      major: z.string().min(1),
      score: z.number().nullable(),
      startDate: z.date(),
      endDate: z.date(),
    })
  ),
})

export const resumeSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  raw: z.string().min(1),
  parsed: baseResumeSchema.nullable(),
})

export type MGResume = z.infer<typeof resumeSchema>

export const jobDescriptionSchema = z.object({
  id: z.string().min(1),
  raw: z.string().min(1),
  parsed: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      skills: z.array(z.string().min(1)),
      keywords: z.array(z.string().min(1)),
      roleExpectations: z.array(z.string().min(1)),
    })
    .nullable(),
})

export type MGJobDescription = z.infer<typeof jobDescriptionSchema>

export const aiGeneratedResumeSchema = z.object({
  id: z.string().min(1),
  resume: baseResumeSchema.nullable(),
  oldCvJDMatchAnalysis: z
    .object({
      keywordMatch: z.number().nullable(),
      semanticSimilarity: z.number().nullable(),
      readability: z.number().nullable(),
      atsScore: z.number().nullable(),
    })
    .nullable(),
  newCvJDMatchAnalysis: z
    .object({
      keywordMatch: z.number().nullable(),
      semanticSimilarity: z.number().nullable(),
      readability: z.number().nullable(),
      atsScore: z.number().nullable(),
    })
    .nullable(),
})

export type MGAiGeneratedResume = z.infer<typeof aiGeneratedResumeSchema>
