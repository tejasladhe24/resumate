import { env } from "@/env"
import { createRemoteJWKSet, jwtVerify } from "jose"

const JWKS = createRemoteJWKSet(new URL(`${env.APP_UI_URL}/api/auth/jwks`), {
  cacheMaxAge: 60 * 60 * 24 * 30, // 30 days
})

export async function validateToken(
  token: string,
  options?: { issuer?: string; audience?: string }
): Promise<{ user: { id: string; name?: string; email?: string } }> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: options?.issuer,
    audience: options?.audience,
  })

  if (typeof payload.sub !== "string") throw new Error("Invalid token subject")

  const user = {
    id: payload.sub,
    name: typeof payload.name === "string" ? payload.name : undefined,
    email: typeof payload.email === "string" ? payload.email : undefined,
  }

  return { user }
}
