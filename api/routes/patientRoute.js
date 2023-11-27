import express from "express"
import { addPatients, deletePatient, editPatient, getAllPatients, getPatientById, searchPatient } from "../controllers/patientController.js"

const patientRouter = express.Router()

patientRouter.get("/all", getAllPatients)
patientRouter.post("/add", addPatients)
patientRouter.get("/get-patient-by-id", getPatientById)
patientRouter.put("/edit-patient", editPatient)
patientRouter.put("/search-patient", searchPatient)
patientRouter.delete("/delete-patient", deletePatient)




export default patientRouter