import express from "express"
import { addTreatment, deleteTreatment, editTreatment, getAllTreatments, getTreatmentById } from "../controllers/treatmentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const treatmentRouter = express.Router()

treatmentRouter.get("/all", isAuthenticated, getAllTreatments)
treatmentRouter.post("/add-treatment", isAuthenticated, addTreatment)
treatmentRouter.get("/get-treatment-by-id", isAuthenticated, getTreatmentById)
treatmentRouter.put("/edit-treatment", isAuthenticated, editTreatment)
treatmentRouter.delete("/delete-treatment", isAuthenticated, deleteTreatment)

export default treatmentRouter