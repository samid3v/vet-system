import asyncHandler from 'express-async-handler';
import Vaccine from '../server/models/vaccineModel.js';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import Treatment from '../server/models/treatmentModel.js';
import Appointment from '../server/models/appointmentsModel.js';

export const moduleStats = asyncHandler(async(req, res)=>{
     const doses = await Vaccine.countDocuments({
          status: 'Completed',
        });
        const customers = await User.countDocuments({
          role: 'customer',
        });
        const patients = await Patient.countDocuments();
        const treatments = await Treatment.countDocuments();
        const appointments = await Appointment.countDocuments({
          status: 'Completed',
        });

        

        res.status(200).json({
          doses,
          customers,
          patients,
          treatments,
          appointments
        })
})