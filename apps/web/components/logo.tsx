import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"

export const Logo = ({ small = false }: { small?: boolean }) => {
  if (small) {
    return (
      <Link href="/">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <GalleryVerticalEnd className="size-4" /> Resumate
        </div>
      </Link>
    )
  }
  return (
    <Link href="/">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">Resumate</span>
        <span className="">v1.0.0</span>
      </div>
    </Link>
  )
}
