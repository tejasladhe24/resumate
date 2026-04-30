import { JobDescriptionView } from "@/components/job-description-view"

interface JobDescriptionPageProps {
  params: Promise<{
    jdId: string
  }>
}

export default async function JobDescriptionPage({
  params,
}: JobDescriptionPageProps) {
  const { jdId } = await params

  return <JobDescriptionView jdId={jdId} />
}
