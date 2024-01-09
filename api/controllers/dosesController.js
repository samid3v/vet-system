import asyncHandler from 'express-async-handler';
import Dose from '../server/models/dosesModel.js';
import Vaccine from '../server/models/vaccineModel.js';
import User from '../server/models/userModel.js';


export const getAllDosesById = asyncHandler(async(req, res) =>{
     const {id} = req.query

     const doses = await Dose.find({vaccine:id})
     if (!doses) {
          const error = new Error("Error fetching dose info");
          error.statusCode = 400;
          throw error;
     }

     res.status(200).json(doses)
})

export const addDosesFn = asyncHandler(async (req, res)=>{
     const {date, vet, administered, vaccine} = req.body

     if (!date || !vet ) {
          const error = new Error("Check required fields");
          error.statusCode = 400;
          throw error;
     }

     const vaccineExist = await Vaccine.findById({_id:vaccine})
     const vetExist = await User.findById({_id:vet})

     if (!vaccineExist) {
          const error = new Error("Vaccine Not Found");
          error.statusCode = 400;
          throw error;
     }

     if (!vetExist) {
          const error = new Error("Vet Not Found");
          error.statusCode = 400;
          throw error;
     }

     const dose = new Vaccine({
          date, 
          vet, 
          administered, 
          vaccine
     });
         
        
      const output= await dose.save();

      if (output) {
          res.status(201).json({message:'Dose added successfully'})
      }


})