import express from "express"
import { addDosesFn, getAllDosesById } from "../controllers/dosesController.js"

const doseRouter = express.Router()

doseRouter.get("/all", getAllDosesById)
doseRouter.post("/add-dose", addDosesFn)
// doseRouter.get("/get-boarder-by-id", getBoarderById)
// doseRouter.get("/get-patients", getPatients)
// doseRouter.put("/edit-boarder", editBoarder)
// doseRouter.put("/edit-boarder-status", editBoarderStatus)
// doseRouter.delete("/delete-boarder", deleteBoarder)

export default doseRouter