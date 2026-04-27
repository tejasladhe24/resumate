import { type Response, Router } from "express"

const router: Router = Router()

router.get("/", (_, res: Response) => {
  res.json({ message: "OK" })
})

export { router as healthRouter }
