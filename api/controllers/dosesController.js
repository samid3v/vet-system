import asyncHandler from 'express-async-handler';
import Dose from '../server/models/dosesModel.js';


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