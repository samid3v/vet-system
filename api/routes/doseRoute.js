import express from "express"
import { addDosesFn, deleteDoseFn, getAllDosesById } from "../controllers/dosesController.js"

const doseRouter = express.Router()

doseRouter.get("/all", getAllDosesById)
doseRouter.post("/add-dose", addDosesFn)
// doseRouter.get("/get-boarder-by-id", getBoarderById)
// doseRouter.get("/get-patients", getPatients)
// doseRouter.put("/edit-boarder", editBoarder)
// doseRouter.put("/edit-boarder-status", editBoarderStatus)
doseRouter.delete("/delete-dose", deleteDoseFn)

export default doseRouter