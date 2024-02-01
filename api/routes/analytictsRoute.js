import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { moduleStats } from "../controllers/analyticsController.js"

const analyticsRouter = express.Router()

analyticsRouter.get("/module-stats", isAuthenticated, moduleStats)

export default analyticsRouter