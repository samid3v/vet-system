import express from "express"
import { addTransactions, deleteTransaction, fetchTransactions } from "../controllers/transactionController.js"

const transactionRoutes = express.Router()

transactionRoutes.get("/all", fetchTransactions)
transactionRoutes.post("/add-transaction", addTransactions)
transactionRoutes.delete("/delete-transaction", deleteTransaction)

export default transactionRoutes

