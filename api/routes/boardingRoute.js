import express from "express"
import { addBoarder, deleteBoarder, editBoarder, getAllBoarders, getBoarderById, getStatusStats } from "../controllers/boardingController.js"

const boardingRouter = express.Router()

boardingRouter.get("/all", getStatusStats)
boardingRouter.get("/stats", getAllBoarders)
boardingRouter.post("/add-boarder", addBoarder)
boardingRouter.get("/get-boarder-by-id", getBoarderById)
boardingRouter.put("/edit-boarder", editBoarder)
boardingRouter.delete("/delete-boarder", deleteBoarder)

export default boardingRouter