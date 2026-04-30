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

const resumes = [
  {
    id: "rn-1",
    title: "Base Resume",
    status: "Primary",
    updatedAt: "2h ago",
    points: 18,
  },
  {
    id: "rn-2",
    title: "Backend Engineer - Tailored",
    status: "Tailored",
    updatedAt: "1d ago",
    points: 24,
  },
]

export const ResumesList = () => {
  if (resumes.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No resumes yet</EmptyTitle>
          <EmptyDescription>
            Upload your base resume to create your profile and start tailoring.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create profile resume</Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
      {resumes.map((resume) => (
        <Card key={resume.id}>
          <CardHeader>
            <CardTitle>{resume.title}</CardTitle>
            <CardDescription>Updated {resume.updatedAt}</CardDescription>
            <CardAction>
              <Badge variant="outline">{resume.status}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>{resume.points} bullet points available</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary">
              <Link href={`/resumes/${resume.id}`}>View resume</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
