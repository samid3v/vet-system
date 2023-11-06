import express from "express"
import { addTreatment, deleteTreatment, editTreatment, getAllTreatments, getTreatmentById } from "../controllers/treatmentController.js"

const treatmentRouter = express.Router()

treatmentRouter.get("/all", getAllTreatments)
treatmentRouter.post("/add-treatment", addTreatment)
treatmentRouter.get("/get-treatment-by-id", getTreatmentById)
treatmentRouter.put("/edit-treatment", editTreatment)
treatmentRouter.delete("/delete-treatment", deleteTreatment)

export default treatmentRouter