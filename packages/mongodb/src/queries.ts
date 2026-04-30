import { Collection, Db, MongoClient } from "mongodb"
import type { MGResume, MGJobDescription } from "./schema"
import {
  DB_NAME,
  JOB_DESCRIPTIONS_COLLECTION,
  RESUMES_COLLECTION,
} from "./constants"

type ResumeUpdate = Partial<
  Omit<MGResume, "_id" | "createdAt" | "updatedAt" | "userId">
>

export class ResumeDAO {
  private readonly db: Db
  private readonly resumesCollection: Collection<MGResume>

  constructor(client: MongoClient) {
    this.db = client.db(DB_NAME)
    this.resumesCollection = this.db.collection(RESUMES_COLLECTION)
  }

  async create(resume: MGResume) {
    const result = await this.resumesCollection.insertOne({
      ...resume,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return result.insertedId
  }

  async update(_id: string, update: ResumeUpdate) {
    const result = await this.resumesCollection.updateOne(
      { _id },
      {
        $set: {
          ...update,
          updatedAt: new Date(),
        },
      }
    )

    return result.modifiedCount
  }

  async delete(_id: string) {
    const result = await this.resumesCollection.deleteOne({ _id })
    return result.deletedCount
  }

  async getById(_id: string) {
    return this.resumesCollection.findOne({ _id })
  }

  async getByUser(userId: string) {
    return this.resumesCollection.find({ userId }).toArray()
  }
}

type JDUpdate = Partial<
  Omit<MGJobDescription, "_id" | "createdAt" | "updatedAt" | "userId">
>

export class JobDescriptionDAO {
  private readonly db: Db
  private readonly collection: Collection<MGJobDescription>

  constructor(client: MongoClient) {
    this.db = client.db(DB_NAME)
    this.collection = this.db.collection(JOB_DESCRIPTIONS_COLLECTION)
  }

  async create(jobDescription: MGJobDescription) {
    const result = await this.collection.insertOne({
      ...jobDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return result.insertedId
  }

  async update(_id: string, update: JDUpdate) {
    const result = await this.collection.updateOne(
      { _id },
      {
        $set: {
          ...update,
          updatedAt: new Date(),
        },
      }
    )

    return result.modifiedCount
  }

  async delete(_id: string) {
    const result = await this.collection.deleteOne({ _id })
    return result.deletedCount
  }

  async getById(_id: string) {
    return this.collection.findOne({ _id })
  }

  async getAllByUser(userId: string) {
    return this.collection.find({ userId }).toArray()
  }

  async getByCompany(company: string) {
    return this.collection.find({ "parsed.company": company }).toArray()
  }
}
