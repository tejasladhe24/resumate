import { env } from "@/env"
import { auth } from "@/lib/auth"
import { inngest } from "@/lib/inngest"
import { s3 } from "@/lib/storage"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  const formData = await request.formData()
  const file = formData.get("resume") as File

  if (!file) return new NextResponse("No file uploaded", { status: 400 })

  try {
    const buffer = await file.arrayBuffer()

    const ext = file.name.split(".").pop()
    const key = `resume-${session.user.id}.${ext}`

    const res = await s3.send(
      new PutObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
        Body: Buffer.from(buffer),
      })
    )

    // trigger resume parsing background job on inngest
    await inngest.send({
      name: "resume/parse",
      data: {
        userId: session.user.id,
        key,
      },
    })

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Failed to upload resume", { status: 500 })
  }
}
