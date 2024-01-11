import express from "express"
import { addDosesFn, deleteDoseFn, editDosesFn, getAllDosesById, getSingleDoseFn } from "../controllers/dosesController.js"

const doseRouter = express.Router()

doseRouter.get("/all", getAllDosesById)
doseRouter.post("/add-dose", addDosesFn)
doseRouter.get("/get-single-dose", getSingleDoseFn)
// doseRouter.get("/get-patients", getPatients)
doseRouter.put("/edit-dose", editDosesFn)
// doseRouter.put("/edit-boarder-status", editBoarderStatus)
doseRouter.delete("/delete-dose", deleteDoseFn)

export default doseRouter