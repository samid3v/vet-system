import express from "express"
import { addAppointment, deleteAppointment, editAppointment, getAllAppointments, getAppointmentById } from "../controllers/appointmentController.js"

const appointmentRouter = express.Router()

appointmentRouter.get("/all", getAllAppointments)
appointmentRouter.post("/add-appointment", addAppointment)
appointmentRouter.get("/get-appointment-by-id/:id", getAppointmentById)
appointmentRouter.put("/edit-appointment/:id", editAppointment)
appointmentRouter.delete("/delete-appointment/:id", deleteAppointment)




export default appointmentRouter