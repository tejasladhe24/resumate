"use client"

import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"

interface JobDescriptionViewProps {
  jdId: string
}

export const JobDescriptionView = ({ jdId }: JobDescriptionViewProps) => {
  const jobDescription = {
    id: jdId,
    role: "Senior Backend Engineer",
    company: "Acme Labs",
    location: "Remote",
    createdAt: "Today",
    summary:
      "Looking for a backend engineer to design scalable services, optimize database performance, and build reliable async pipelines.",
    requirements: [
      "4+ years building production-grade backend services.",
      "Strong knowledge of PostgreSQL, data modeling, and query optimization.",
      "Experience with event-driven systems and async processing.",
      "Strong collaboration and communication skills.",
    ],
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{jobDescription.role}</CardTitle>
          <CardDescription>
            {jobDescription.company} - {jobDescription.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">JD ID: {jobDescription.id}</Badge>
          <Badge variant="secondary">Added {jobDescription.createdAt}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Summary</CardTitle>
          <CardDescription>
            Use this context to generate role-specific resume points.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{jobDescription.summary}</p>
        </CardContent>
        <Separator />
        <CardContent>
          <h3 className="font-medium">Requirements</h3>
          <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
            {jobDescription.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Generate tailored resume</Button>
          <Button asChild variant="outline">
            <Link href="/job-description">Back to job descriptions</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
