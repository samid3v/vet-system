import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';

export const getAllTreatments = asyncHandler(async(req, res) => {

  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalDocs = await Treatment.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
   const treatments = await Treatment.find()
   .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);
    
   if (treatments) {
    
    res.status(200).json(
      {
        page,
        pageSize,
        totalDocs,
        totalPages, 
        data: treatments,
      }
    )
    
   }
})

export const addTreatment = asyncHandler(async(req, res) => {
    const {name, description, cost, status} = req.body

    if (!name) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }
        
      const newTreatment = new Treatment({name, description, cost, status});
      const output= await newTreatment.save();
      if (output) {
          res.status(201).json({message:"Treatment Added Successfully"})
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})

export const getTreatmentById = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    if (id) {
      const treatment = await Treatment.findById(id)
  
      if (treatment) {
        res.status(200).json(treatment);
      } else {
        const error = new Error('Treatment not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;
  
    const updateData = req.body; // Request body should contain the updated patient data 
    // Ensure that "name" and "owner" fields are required
    if (!updateData.name) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
    }

    const updatedAppointment = await Treatment.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedAppointment) {
      return res.status(201).json({ message: 'Treatment updated successfully' });
    }else{
        const error = new Error('Treatment Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (id) {
        const deleteMedicationStock = await Treatment.findByIdAndDelete(id);

        if (!deleteMedicationStock) {
            const error = new Error('Treatment Not Found');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ message: 'Treatment deleted successfully' });
    }else{
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });