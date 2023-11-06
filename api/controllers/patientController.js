import asyncHandler from 'express-async-handler';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import mongoose from 'mongoose';

export const getAllPatients = asyncHandler(async(req, res) => {
  const patient = await Patient.find();
  
  res.status(200).json(patient);
 
})

export const addPatients = asyncHandler(async(req, res) => {
    const {name, species,breed,age, weight,owner} = req.body
    const exist = await Patient.findOne({ name });
    if (exist) {
      const error = new Error("Patient Name Already Taken");
      error.statusCode = 400;
      throw error;
    }
    if (name && owner) {
        const ownerId = new mongoose.Types.ObjectId(owner)
        const user = await User.findOne({ _id:ownerId });
        if (user) {
            const newPatient = new Patient({ name, species,breed,age, weight,owner});
            const output= await newPatient.save();
            if (output) {
                res.status(201).json({message:"Patient Added Successfully"})
            }else{
                const error = new Error("something wrong happenned, try again");
                error.statusCode = 400;
                throw error;
            }
        }else{
            const error = new Error("user doesnt exist");
            error.statusCode = 400;
            throw error;
        }
    }else{
        const error = new Error("check required fields");
        error.statusCode = 400;
        throw error;
    }

})

export const getPatientById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const patient = await Patient.findById(id).populate('owner', '-password');
  
      if (patient) {
        res.json(patient);
      } else {
        const error = new Error('Patient not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editPatient = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const updateData = req.body; // Request body should contain the updated patient data

    // Ensure that "name" and "owner" fields are required
    if (!updateData.name || !updateData.owner) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
        process.exit(1)
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedPatient) {
      return res.status(201).json({ message: 'Patient updated successfully' });
    }else{
        const error = new Error('Patient Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id) {
        const deletePatient = await Patient.findByIdAndDelete(id);

        if (!deletePatient) {
            const error = new Error('Patient Not Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ message: 'Patient deleted successfully' });
    }else{
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });