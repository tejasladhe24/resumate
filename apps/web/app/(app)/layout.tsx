import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  })

  if (!sessionData?.session) redirect("/login")

  return children
}
