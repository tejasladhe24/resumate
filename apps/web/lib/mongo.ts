import { ResumeDAO, JobDescriptionDAO } from "@workspace/mongodb"
import { env } from "@/env"
import { MongoClient } from "mongodb"

const client = new MongoClient(env.MONGODB_URL)

export const resumeDAO = new ResumeDAO(client)
export const jobDescriptionDAO = new JobDescriptionDAO(client)
