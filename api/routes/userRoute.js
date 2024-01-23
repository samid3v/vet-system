import express from "express"
import { getUser, userLogin, userLogout, userSignUp } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRouter = express.Router()

userRouter.get("/",  getUser)

userRouter.post('/login', userLogin);
userRouter.post('/logout', isAuthenticated, userLogout);

userRouter.post('/register', isAuthenticated, userSignUp);

export default userRouter
