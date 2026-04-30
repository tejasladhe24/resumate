import { ResumeView } from "@/components/resume-view"

interface ResumePageProps {
  params: Promise<{
    resumeId: string
  }>
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { resumeId } = await params

  return <ResumeView resumeId={resumeId} />
}
