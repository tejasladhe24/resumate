import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { DialogProvider } from "@workspace/ui/components/dialog"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "sonner"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="h-svh">
        <DialogProvider>
          <ThemeProvider
            attribute={"class"}
            storageKey="theme"
            enableSystem
            defaultTheme="system"
          >
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </ThemeProvider>
        </DialogProvider>
      </body>
    </html>
  )
}
