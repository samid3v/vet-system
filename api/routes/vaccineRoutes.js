import express from "express"
import { addVaccine, deleteVaccine, editVaccine, getAllVaccines } from "../controllers/vaccineController.js"

const vaccineRouter = express.Router()

vaccineRouter.get("/all", getAllVaccines)
vaccineRouter.post("/add-vaccine", addVaccine)
// vaccineRouter.get("/get-treatment-by-id", getTreatmentById)
vaccineRouter.put("/edit-vaccine", editVaccine)
vaccineRouter.delete("/delete-vaccine", deleteVaccine)

export default vaccineRouter