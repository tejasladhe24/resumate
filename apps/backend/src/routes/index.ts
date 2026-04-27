import { Router } from "express"
import { healthRouter } from "./health"
import { inngestRouter } from "./inngest"

const router: Router = Router()

router.use("/health", healthRouter)
router.use("/inngest", inngestRouter)

export default router
