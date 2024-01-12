import express from "express"
import { getAllCustomers, getAllPatients, getAllUsers, getModelById } from "../controllers/randomApiController.js"

const randomRoutes = express.Router()

randomRoutes.get('/all-patients', getAllPatients)
randomRoutes.get('/all-users', getAllUsers)
randomRoutes.get('/model-by-id', getModelById)
randomRoutes.get('/all-customers', getAllCustomers)

export default randomRoutes