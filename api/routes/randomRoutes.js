import express from "express"
import { getAllPatients, getAllUsers } from "../controllers/randomApiController.js"

const randomRoutes = express.Router()

randomRoutes.get('/all-patients', getAllPatients)
randomRoutes.get('/all-users', getAllUsers)

export default randomRoutes