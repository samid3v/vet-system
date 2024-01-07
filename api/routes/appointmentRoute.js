import express from "express"
import { addAppointment, deleteAppointment, editAppointment, editAppointmentStatus, getAllAppointments, getAppointmentById, getStatusStats } from "../controllers/appointmentController.js"

const appointmentRouter = express.Router()

appointmentRouter.get("/all", getAllAppointments)
appointmentRouter.get("/stats", getStatusStats)
appointmentRouter.post("/add-appointment", addAppointment)
appointmentRouter.get("/get-appointment-by-id/:id", getAppointmentById)
appointmentRouter.put("/edit-appointment", editAppointment)
appointmentRouter.put("/edit-clinic-status", editAppointmentStatus)
appointmentRouter.delete("/delete-appointment", deleteAppointment)




export default appointmentRouter