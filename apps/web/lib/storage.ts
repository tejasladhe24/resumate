import { env } from "@/env"
import {
  CreateBucketCommand,
  HeadBucketCommand,
  NotFound,
  S3Client,
} from "@aws-sdk/client-s3"

declare global {
  var _s3: S3Client
}

export const s3 =
  global._s3 ||
  new S3Client({
    region: env.AWS_REGION,
    endpoint: env.S3_ENDPOINT,
    forcePathStyle: true, // important for MinIO
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

if (!global._s3) global._s3 = s3

async function getOrCreateS3Bucket() {
  try {
    await s3.send(
      new HeadBucketCommand({
        Bucket: env.S3_BUCKET,
      })
    )

    return true
  } catch (error) {
    console.error(error)

    if (error instanceof NotFound) {
      await s3.send(
        new CreateBucketCommand({
          Bucket: env.S3_BUCKET,
        })
      )
      return true
    }

    throw error
  }
}

getOrCreateS3Bucket().then((res) => {
  console.log("S3 bucket created", res)
})
