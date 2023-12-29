import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import errorHandler from "./middlewares/errorHandler.js"
import { connectDB } from "./server/db/connectDb.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import patientRouter from "./routes/patientRoute.js"
import appointmentRouter from "./routes/appointmentRoute.js"
import medicalRouter from "./routes/medicalRoute.js"
import treatmentRouter from "./routes/treatmentRoute.js"
import boardingRouter from "./routes/boardingRoute.js"
import customerRouter from "./routes/customerRoute.js"
import transactionRoutes from "./routes/transactionRoute.js"

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: process.env.API_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(cookieParser());

//endpoints
app.use("/api/users", userRouter)
app.use("/api/patients", patientRouter)
app.use("/api/appointments", appointmentRouter)
app.use("/api/medical", medicalRouter)
app.use("/api/treatments", treatmentRouter)
app.use("/api/boarding", boardingRouter)
app.use("/api/customers", customerRouter)
app.use("/api/transactions", transactionRoutes)

app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    connectDB()
})