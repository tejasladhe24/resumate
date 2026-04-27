import { createAuthClient } from "better-auth/client"
import { jwtClient, anonymousClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [jwtClient(), anonymousClient()],
  fetchOptions: {
    credentials: "include",
  },
})
