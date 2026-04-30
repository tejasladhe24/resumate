"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { useAuth } from "@/components/auth-provider"
import { authClient } from "@/lib/auth-client"
import { Input } from "@workspace/ui/components/input"
import { useRef } from "react"

export const ProfileView = () => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const resumeInputRef = useRef<HTMLInputElement>(null)

  async function handleSignOut() {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message ?? "Failed to sign out")
      return
    }

    toast.success("Signed out successfully")
    router.push("/login")
    router.refresh()
  }

  async function handleUploadResume() {
    if (!resumeInputRef.current) return
    const file = resumeInputRef.current.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    const confirm = window.confirm(
      "Are you sure you want to update your existing resume? This action cannot be undone. Ignore and click 'OK' if you are uploading for the first time."
    )

    if (!confirm) return

    const formData = new FormData()

    formData.append("resume", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      toast.error("Failed to upload resume")
      return
    }

    toast.success("Resume uploaded successfully")
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Loading your profile details...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Profile unavailable</EmptyTitle>
          <EmptyDescription>
            Sign in to view and manage your profile.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your account and resume identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate font-medium">{user.name}</p>
            <p className="truncate text-muted-foreground">{user.email}</p>
            <div className="flex gap-2">
              <Badge variant={user.emailVerified ? "secondary" : "outline"}>
                {user.emailVerified ? "Email verified" : "Email not verified"}
              </Badge>
              {user.isAnonymous && <Badge variant="outline">Anonymous</Badge>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <Button onClick={() => resumeInputRef.current?.click()}>
                Update Resume
              </Button>
              <Input
                type="file"
                className="hidden"
                ref={resumeInputRef}
                accept="application/pdf"
                onChange={handleUploadResume}
              />
            </div>
            <div className="flex gap-2">
              {user.isAnonymous && (
                <Button asChild variant="outline">
                  <Link href="/login">Login with email</Link>
                </Button>
              )}
              <Button variant="destructive" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
