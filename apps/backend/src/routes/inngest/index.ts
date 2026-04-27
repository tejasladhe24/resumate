import { inngest, functions } from "@/lib/inngest"
import { Router } from "express"
import { serve } from "inngest/express"

const router: Router = Router()

router.use("/", serve({ client: inngest, functions }))

export { router as inngestRouter }
