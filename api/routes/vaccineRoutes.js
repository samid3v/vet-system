import express from "express"
import { addVaccine, deleteVaccine, editVaccine, getAllVaccines } from "../controllers/vaccineController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const vaccineRouter = express.Router()

vaccineRouter.get("/all", isAuthenticated, getAllVaccines)
vaccineRouter.post("/add-vaccine", isAuthenticated, addVaccine)
// vaccineRouter.get("/get-treatment-by-id", getTreatmentById)
vaccineRouter.put("/edit-vaccine", isAuthenticated, editVaccine)
vaccineRouter.delete("/delete-vaccine", isAuthenticated, deleteVaccine)

export default vaccineRouter