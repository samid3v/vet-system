import Patient from "../server/models/patientModel";
import User from "../server/models/userModel";

export const getAllPatients = asyncHandler(async(req, res) => {
     const patients = await Patient.find()

     if (!patients) {
          const error = new Error("Error Retrieving Patients");
          error.statusCode = 400;
          throw error;
     }
 
     res.status(200).json(patients)
 })

 export const getAllUsers = asyncHandler(async(req, res) => {
     const users = await User.find({ role: { $ne: 'customer' } });

     if (!users) {
          const error = new Error("Error Retrieving Patients");
          error.statusCode = 400;
          throw error;
     }
 
     res.status(200).json(users)
 })