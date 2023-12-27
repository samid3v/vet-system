import express from "express"
import { addTransactions, fetchTransactions } from "../controllers/transactionController.js"

const transactionRoutes = express.Router()

transactionRoutes.get("/all", fetchTransactions)
transactionRoutes.post("/add-transaction", addTransactions)

export default transactionRoutes

