import express from "express"
import { addPatients, deletePatient, editPatient, getAllPatients, getPatientById } from "../controllers/patientController.js"

const patientRouter = express.Router()

patientRouter.get("/all", getAllPatients)
patientRouter.post("/add", addPatients)
patientRouter.get("/get-patient-by-id", getPatientById)
patientRouter.put("/edit-patient", editPatient)
patientRouter.delete("/delete-patient", deletePatient)




export default patientRouter