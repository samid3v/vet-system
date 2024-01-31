import express from "express"
import { addTreatment, deleteTreatment, editTreatment, getAllTreatments, getTreatmentById, searchFilter } from "../controllers/treatmentController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const treatmentRouter = express.Router()

treatmentRouter.get("/all", isAuthenticated, getAllTreatments)
treatmentRouter.post("/add-treatment", isAuthenticated, addTreatment)
treatmentRouter.get("/get-treatment-by-id", isAuthenticated, getTreatmentById)
treatmentRouter.put("/edit-treatment", isAuthenticated, editTreatment)
treatmentRouter.delete("/delete-treatment", isAuthenticated, deleteTreatment)
<<<<<<< HEAD
<<<<<<< HEAD
treatmentRouter.post("/search-filter", isAuthenticated, searchFilter)
=======
treatmentRouter.get("/search-filter", isAuthenticated, searchFilter)
>>>>>>> 9fdd3fe (treatment api filter update)
=======
treatmentRouter.post("/search-filter", isAuthenticated, searchFilter)
>>>>>>> 0133d57 (treatments search filter update)


export default treatmentRouter