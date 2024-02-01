import express from "express"
import { addVaccine, deleteVaccine, editVaccine, getAllVaccines, searchFilter } from "../controllers/vaccineController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const vaccineRouter = express.Router()

vaccineRouter.get("/all", isAuthenticated, getAllVaccines)
vaccineRouter.post("/add-vaccine", isAuthenticated, addVaccine)
// vaccineRouter.get("/get-treatment-by-id", getTreatmentById)
vaccineRouter.put("/edit-vaccine", isAuthenticated, editVaccine)
vaccineRouter.delete("/delete-vaccine", isAuthenticated, deleteVaccine)
<<<<<<< HEAD
<<<<<<< HEAD
vaccineRouter.post("/search-filter", isAuthenticated, searchFilter)
=======
vaccineRouter.get("/search-filter", isAuthenticated, searchFilter)
>>>>>>> 902ea53 (vaccine filter api update)
=======
vaccineRouter.post("/search-filter", isAuthenticated, searchFilter)
>>>>>>> 6fc6f32 (vaccine search filter update)

export default vaccineRouter