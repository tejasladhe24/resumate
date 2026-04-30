"use client"

import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

export const AppHeader = () => {
  const pathname = usePathname()

  const parts = pathname.split("/").filter(Boolean)

  const isRoot = parts.length === 0

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="my-auto mr-2 data-[orientation=vertical]:h-6"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">Resumate</BreadcrumbLink>
          </BreadcrumbItem>
          {!isRoot && <BreadcrumbSeparator className="hidden md:block" />}
          {parts.slice(0, parts.length - 1).map((part, index) => (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  href={`/${parts.slice(0, index + 1).join("/")}`}
                  className="capitalize"
                >
                  {part.replace(/-/g, " ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {parts[parts.length - 1]?.replace(/-/g, " ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
