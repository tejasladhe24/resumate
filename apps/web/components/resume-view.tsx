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

interface ResumeViewProps {
  resumeId: string
}

export const ResumeView = ({ resumeId }: ResumeViewProps) => {
  const resume = {
    id: resumeId,
    title: "Backend Engineer - Tailored Resume",
    sourceResume: "Base Resume",
    jdTitle: "Senior Backend Engineer",
    updatedAt: "5 minutes ago",
    points: [
      "Improved API response performance by introducing query optimization and cache-aware endpoints.",
      "Designed background workflows for asynchronous data processing and reliability monitoring.",
      "Collaborated with product and design to ship measurable UX and conversion improvements.",
      "Implemented secure authentication flows and role-based authorization across internal tools.",
    ],
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{resume.title}</CardTitle>
          <CardDescription>
            Resume ID: {resume.id} - Updated {resume.updatedAt}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Source: {resume.sourceResume}</Badge>
          <Badge variant="outline">JD: {resume.jdTitle}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tailored Bullet Points</CardTitle>
          <CardDescription>
            These points are generated and aligned with the selected job description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            {resume.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
        <Separator />
        <CardFooter className="gap-2">
          <Button variant="secondary">Regenerate points</Button>
          <Button asChild variant="outline">
            <Link href="/resumes">Back to resumes</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
