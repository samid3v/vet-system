import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { moduleStats, upcomingAppointmentsFn } from "../controllers/analyticsController.js"

const analyticsRouter = express.Router()

analyticsRouter.get("/module-stats", isAuthenticated, moduleStats)
analyticsRouter.get("/upcoming-appointments", isAuthenticated, upcomingAppointmentsFn)

export default analyticsRouter