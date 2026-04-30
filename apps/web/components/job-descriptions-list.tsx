"use client"

import Link from "next/link"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"

const jobDescriptions = [
  {
    id: "jd-1",
    role: "Senior Backend Engineer",
    company: "Acme Labs",
    status: "Active",
    createdAt: "Today",
    skills: ["Node.js", "PostgreSQL", "System Design"],
  },
  {
    id: "jd-2",
    role: "Full Stack Engineer",
    company: "Orbit AI",
    status: "Draft",
    createdAt: "Yesterday",
    skills: ["Next.js", "TypeScript", "MongoDB"],
  },
]

export const JobDescriptionsList = () => {
  if (jobDescriptions.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No job descriptions yet</EmptyTitle>
          <EmptyDescription>
            Add a job description to generate a tailored resume.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Add job description</Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
      {jobDescriptions.map((jd) => (
        <Card key={jd.id}>
          <CardHeader>
            <CardTitle>{jd.role}</CardTitle>
            <CardDescription>
              {jd.company} - Added {jd.createdAt}
            </CardDescription>
            <CardAction>
              <Badge variant="outline">{jd.status}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {jd.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary">
              <Link href={`/job-description/${jd.id}`}>View details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
