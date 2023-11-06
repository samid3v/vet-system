import express from "express"
import { AddCustomer, deleteCustomer, editCustomer, getCustomerById, getCustomers } from "../controllers/customerController.js"

const customerRouter = express.Router()

customerRouter.get("/all", getCustomers)
customerRouter.post("/add-customer", AddCustomer)
customerRouter.get("/get-customer-by-id", getCustomerById)
customerRouter.put("/edit-customer", editCustomer)
customerRouter.delete("/delete-customer", deleteCustomer)

export default customerRouter