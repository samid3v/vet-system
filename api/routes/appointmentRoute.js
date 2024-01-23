import express from "express"
import { addAppointment, deleteAppointment, editAppointment, editAppointmentStatus, getAllAppointments, getAppointmentById, getStatusStats } from "../controllers/appointmentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const appointmentRouter = express.Router()

appointmentRouter.get("/all", isAuthenticated, getAllAppointments)
appointmentRouter.get("/stats", isAuthenticated, getStatusStats)
appointmentRouter.post("/add-appointment", isAuthenticated, addAppointment)
appointmentRouter.get("/get-appointment-by-id/:id", isAuthenticated, getAppointmentById)
appointmentRouter.put("/edit-appointment", isAuthenticated, editAppointment)
appointmentRouter.put("/edit-clinic-status", isAuthenticated, editAppointmentStatus)
appointmentRouter.delete("/delete-appointment", isAuthenticated, deleteAppointment)




export default appointmentRouter