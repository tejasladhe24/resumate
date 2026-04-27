import { MongoClient } from "mongodb"

export function createClient(url: string) {
  return new MongoClient(url)
}

export const RESUMES_COLLECTION = "resumes"
export const JOB_DESCRIPTIONS_COLLECTION = "job_descriptions"
