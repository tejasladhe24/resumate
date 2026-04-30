import { z } from "zod"

/* ------------------ Shared ------------------ */

export const RawFormatEnum = z.enum(["text", "html", "markdown"])

/* ------------------ Parsed أجزاء ------------------ */

const BasicsSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),
})

const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  skillsUsed: z.array(z.string()).optional(),
})

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string().optional(),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

const SkillsSchema = z.object({
  technical: z.array(z.string()).optional(),
  soft: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
})

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  link: z.string().optional(),
})

const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string().optional(),
  date: z.string().optional(),
})

/* ------------------ Resume ------------------ */

export const ResumeSchema = z.object({
  _id: z.string(),
  userId: z.string(),

  title: z.string().optional(),

  raw: z.object({
    content: z.string(),
    format: RawFormatEnum,
    uploadedAt: z.date(),
  }),

  parsed: z
    .object({
      basics: BasicsSchema.optional(),
      experience: z.array(ExperienceSchema).optional(),
      education: z.array(EducationSchema).optional(),
      skills: SkillsSchema.optional(),
      projects: z.array(ProjectSchema).optional(),
      certifications: z.array(CertificationSchema).optional(),
      embeddings: z.array(z.number()).optional(),
    })
    .optional(),

  meta: z.object({
    parsingStatus: z.enum(["pending", "processing", "completed", "failed"]),
    lastParsedAt: z.date().optional(),
    version: z.number(),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export type MGResume = z.infer<typeof ResumeSchema>

const EmploymentTypeEnum = z.enum([
  "full-time",
  "part-time",
  "contract",
  "internship",
])

/* ------------------ JD ------------------ */

export const JobDescriptionSchema = z.object({
  _id: z.string(),
  userId: z.string(),

  title: z.string().optional(),

  raw: z.object({
    content: z.string(),
    format: RawFormatEnum,
    source: z.string().optional(),
    url: z.string().optional(),
    addedAt: z.date(),
  }),

  parsed: z
    .object({
      company: z.string().optional(),
      role: z.string().optional(),
      location: z.string().optional(),
      employmentType: EmploymentTypeEnum.optional(),

      summary: z.string().optional(),

      responsibilities: z.array(z.string()).optional(),
      requirements: z.array(z.string()).optional(),
      preferredQualifications: z.array(z.string()).optional(),

      skills: z
        .object({
          required: z.array(z.string()).optional(),
          preferred: z.array(z.string()).optional(),
        })
        .optional(),

      experienceLevel: z.string().optional(),

      keywords: z.array(z.string()).optional(),
      embeddings: z.array(z.number()).optional(),
    })
    .optional(),

  meta: z.object({
    parsingStatus: z.enum(["pending", "processing", "completed", "failed"]),
    lastParsedAt: z.date().optional(),
    version: z.number(),
  }),

  createdAt: z.date(),
  updatedAt: z.date(),
})

export type MGJobDescription = z.infer<typeof JobDescriptionSchema>
