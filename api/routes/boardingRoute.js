import express from "express"
import { addBoarder, deleteBoarder, editBoarder, editBoarderStatus, getAllBoarders, getBoarderById, getPatients, getStatusStats } from "../controllers/boardingController.js"

const boardingRouter = express.Router()

boardingRouter.get("/stats", getStatusStats)
boardingRouter.get("/all", getAllBoarders)
boardingRouter.post("/add-boarder", addBoarder)
boardingRouter.get("/get-boarder-by-id", getBoarderById)
boardingRouter.get("/get-patients", getPatients)
boardingRouter.put("/edit-boarder", editBoarder)
boardingRouter.put("/edit-boarder-status", editBoarderStatus)
boardingRouter.delete("/delete-boarder", deleteBoarder)

export default boardingRouter