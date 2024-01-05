import asyncHandler from 'express-async-handler';
import Patient from '../server/models/patientModel.js';
import Appointment from '../server/models/appointmentsModel.js';
import User from '../server/models/userModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';


export const getStatusStats = asyncHandler(async(req, res) => {
  const statusCounts = await Appointment.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);

  const result = statusCounts.reduce((acc, { status, count }) => {
    acc[status] = count;
    return acc;
  }, {});

  res.json(result);

})

export const getAllAppointments = asyncHandler(async(req, res) => {
    
    const status = req.query.status
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalAppointments = await Appointment.countDocuments();
  const totalPages = Math.ceil(totalAppointments / pageSize);

  const appointments = await Appointment.find({ status: status })
  .populate(
    {path:"patient_id", populate: {
    path: 'owner',
  },})
  .populate('by')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(pageSize);

  res.status(200).json({
    page,
    pageSize,
    totalAppointments,
    totalPages,
    data:appointments
  })

})

export const addAppointment = asyncHandler(async(req, res) => {
    const {patient, vet,reason,date, amount, notes,status, description} = req.body

    if (!patient || !reason || !amount || !date) {
      const error = new Error("Check required form fields");
        error.statusCode = 404;
        throw error;
    }

    const patientExist = await Patient.findOne({ _id:patient_id });
    if (!patientExist) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }
    if (vet) {
      const user = await User.findOne({ _id:by });
      if (!user) {
         const error = new Error("Vet doesnt exist");
             error.statusCode = 404;
             throw error;
      }
    }
   
     const existingAppointment = await Appointment.findOne({
        patient_id,
        date
      });

      if (existingAppointment) {
        const error = new Error("Appointment Already Exists");
            error.statusCode = 400;
            throw error;
      }

    

    if (patient_id || by || reason || date ) {
        
        const newAppointment = new Appointment({patient, vet,reason,date, notes,status});
        const output= await newAppointment.save();
        if (output) {
          const data = {
            module_id: output._id,
            module_name:'Appointments',
            amount:amount,
            payment_bal:amount,
            description:description,
          }
          const newPay = new Payment(data);
          const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({message:"Appointment Added Successfully"})
            
          }
        }else{
            const error = new Error("something wrong happenned, try again");
            error.statusCode = 400;
            throw error;
        }
    }else{
        const error = new Error("check required fields");
        error.statusCode = 400;
        throw error;
    }

})

export const getAppointmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const appointment = await Appointment.findById(id)
      .populate('patient_id')
      .populate('by', '-password');
  
      if (appointment) {
        res.status(200).json(appointment);
      } else {
        const error = new Error('Appointment not found');
        error.statusCode = 404; // Correct the status code to 404 for "Not Found"
        throw error;
      }
    } else {
      const error = new Error('Invalid Request');
      error.statusCode = 400;
      throw error;
    }
  });

  export const editAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const updateData = req.body; // Request body should contain the updated patient data
    const patient = await Patient.findOne({ _id:updateData.patient_id });
    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }

    const user = await User.findOne({ _id:updateData.by });
     if (!user) {
        const error = new Error("User doesnt exist");
            error.statusCode = 404;
            throw error;
     }
    // Ensure that "name" and "owner" fields are required
    if (!updateData.patient_id || !updateData.by || !updateData.reason || !updateData.date) {
        const error = new Error('Check Required Fields');
        error.statusCode = 400;
        throw error;
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });

    if (updatedAppointment) {
      return res.status(201).json({ message: 'Appointment updated successfully' });
    }else{
        const error = new Error('Appointment Not Found');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const editAppointmentStatus = asyncHandler(async (req, res) => {
    const { id, status } = req.query;

    if (!id) {
      const error = new Error("Id Not Added");
      error.statusCode = 404;
      throw error;
   }

    if (!status) {
        const error = new Error("Status Not Added");
        error.statusCode = 404;
        throw error;
     }

     const clinicExist = Appointment.findById(id)

     if (!clinicExist) {
      const error = new Error("Appointment Not Found");
        error.statusCode = 404;
        throw error;
     }
  
    
     const updatedClinicStatus = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { runValidators: true, new: true }
    );

    if (updatedClinicStatus) {
      return res.status(201).json({ message: 'Appointment Status updated successfully' });
    }else{
        const error = new Error('Appointment Info Not Added');
        error.statusCode = 400;
        throw error;
    }
    
  });

  export const deleteAppointment = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (id) {
        try {
            const clinicExist = await Appointment.findById(id);
            if (!clinicExist) {
                const error = new Error('Appointment Not Found');
                error.statusCode = 404;
                throw error;
            }

            const payExist = await Payment.findOne({ module_id: id, module_name: 'Appointments' });
            if (!payExist) {
                const error = new Error('Payment Record Not Found');
                error.statusCode = 404;
                throw error;
            }

            const deletedBoarder = await clinicExist.deleteOne();
            if (deletedBoarder) {
                const deletePay = await Payment.deleteOne({ module_id: id, module_name: 'Appointments' });
                if (deletePay) {

                    const deleteT = await Transaction.deleteMany({ payment_id: payExist._id });
                    if (deleteT) {
                        res.status(201).json({ message: 'Appointment record deleted successfully' });
                    } else {
                        throw new Error('Failed to delete related Transaction records');
                    }
                } else {
                    throw new Error('Failed to delete related Payment record');
                }
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }
    } else {
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
    
  });