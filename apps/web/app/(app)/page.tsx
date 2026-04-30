import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default async function Page() {
  return (
    <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Resumate</CardTitle>
          <CardDescription>
            Build role-specific resumes from your profile and job descriptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/profile">Complete profile</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/job-description">Add job description</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resumes">View tailored resumes</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/settings">Settings</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Upload your base resume, add a job description, and let AI generate
          tailored bullet points to improve relevance for each role.
        </CardContent>
      </Card>
    </div>
  )
}
