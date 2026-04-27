import { ClientOnly } from "@/components/client-only"
import { ResetPasswordForm } from "@/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="flex w-full max-w-md flex-col">
      <ClientOnly>
        <ResetPasswordForm />
      </ClientOnly>
    </div>
  )
}
