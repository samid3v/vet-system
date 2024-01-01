import express from "express"
import { getAllPatients, getAllUsers, getModelById } from "../controllers/randomApiController.js"

const randomRoutes = express.Router()

randomRoutes.get('/all-patients', getAllPatients)
randomRoutes.get('/all-users', getAllUsers)
randomRoutes.get('/model-by-id-', getModelById)

export default randomRoutes