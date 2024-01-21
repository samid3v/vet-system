import express from "express"
import { getUser, userLogin, userLogout, userSignUp } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/",  getUser)

userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);

userRouter.post('/register', userSignUp);

export default userRouter
