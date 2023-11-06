import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';
import Boarding from '../server/models/boardingModule.js';
import Patient from '../server/models/patientModel.js';

export const getAllBoarders = asyncHandler(async(req, res) => {
    const boaders = await Boarding.find().populate("patient_id")

    res.status(200).json(boaders)
})

export const addBoarder = asyncHandler(async(req, res) => {
    const {patient_id, start_date, end_date, notes, status} = req.body
    

    const patient = await Patient.findOne({ _id:patient_id });
    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }

    if (!start_date || !end_date) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }
        
      const newBoarder = new Boarding({patient_id, start_date, end_date, notes, status});
      const output= await newBoarder.save();
      if (output) {
          res.status(201).json({message:"Patient Boarding Added Successfully"})
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})

export const getBoarderById = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    if (id) {
      const boarder = await Boarding.findById(id).populate("patient_id")
  
      if (boarder) {
        res.status(200).json(boarder);
      } else {
        const error = new Error('Boarder not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editBoarder = asyncHandler(async (req, res) => {
    const { id } = req.query;

    const updateData = req.body;

    const patient = await Patient.findOne({ _id:updateData.patient_id });
    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }
  
    if (!updateData.start_date || !updateData.end_date ) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
    }

    const updateBoarder = await Boarding.findByIdAndUpdate(id, updateData, { new: true });

    if (updateBoarder) {
      return res.status(201).json({ message: 'Boarder Info updated successfully' });
    }else{
        const error = new Error('Boarder Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteBoarder = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (id) {
        const deleteBoarder = await Boarding.findByIdAndDelete(id);

        if (!deleteBoarder) {
            const error = new Error('Boarder Not Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ message: 'Boarder record deleted successfully' });
    }else{
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });