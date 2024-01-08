import express from "express"
import { addTreatment, deleteTreatment, editTreatment, getAllTreatments, getTreatmentById } from "../controllers/treatmentController.js"

const vaccineRouter = express.Router()

vaccineRouter.get("/all", getAllTreatments)
vaccineRouter.post("/add-treatment", addTreatment)
vaccineRouter.get("/get-treatment-by-id", getTreatmentById)
vaccineRouter.put("/edit-treatment", editTreatment)
vaccineRouter.delete("/delete-treatment", deleteTreatment)

export default vaccineRouter