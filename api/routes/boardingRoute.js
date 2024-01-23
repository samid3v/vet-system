import express from "express"
import { addBoarder, deleteBoarder, editBoarder, editBoarderStatus, getAllBoarders, getPatients, getStatusStats } from "../controllers/boardingController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const boardingRouter = express.Router()

boardingRouter.get("/stats", isAuthenticated, getStatusStats)
boardingRouter.get("/all", isAuthenticated, getAllBoarders)
boardingRouter.post("/add-boarder", isAuthenticated, addBoarder)
// boardingRouter.get("/get-boarder-by-id", getBoarderById)
boardingRouter.get("/get-patients", isAuthenticated, getPatients)
boardingRouter.put("/edit-boarder", isAuthenticated, editBoarder)
boardingRouter.put("/edit-boarder-status", isAuthenticated, editBoarderStatus)
boardingRouter.delete("/delete-boarder", isAuthenticated, deleteBoarder)

export default boardingRouter