import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';
import Boarding from '../server/models/boardingModel.js';
import Patient from '../server/models/patientModel.js';
import Payment from '../server/models/paymentModel.js';

export const getStatusStats = asyncHandler(async(req, res) => {
  const statusCounts = await Boarding.aggregate([
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

export const getPatients = asyncHandler(async(req, res) => {
  const appointments = await Patient.find()
  if (appointments) {
    
    res.status(200).json(appointments)
  }

})

export const getAllBoarders = asyncHandler(async(req, res) => {
  const status = req.query.status
  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalBoarders = await Patient.countDocuments();
  const totalPages = Math.ceil(totalBoarders / pageSize);

  const boaders = await Boarding.find({ status: status })
  .populate({path:"patient_id", populate: {
    path: 'owner',
  },})
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(pageSize);

  res.status(200).json({
    page,
    pageSize,
    totalBoarders,
    totalPages,
    data:boaders
  })
})

 
export const addBoarder = asyncHandler(async(req, res) => {
    const {patient_id, start_date, end_date, notes, status, amount, description } = req.body
    
    if (!start_date || !end_date || !amount || !patient_id || !status ) {
      const error = new Error("Check Required Inputs");
      error.statusCode = 400;
      throw error;
   }

   if (start_date >= end_date) {
    const error = new Error("Wrong Date Inputs");
    error.statusCode = 400;
    throw error;
 }

    const patient = await Patient.findOne({ _id:patient_id });

    if (!patient) {
        const error = new Error("Patient doesnt exist");
        error.statusCode = 404;
        throw error;
     }

     if (status!=='Completed') {
      const ongoingBoarding = await Boarding.findOne({
        patient_id: patient_id,
        status: { $nin: ['Completed','Canceled'] },
      });
    
      if (ongoingBoarding) {
        const error = new Error('Patient has another Boarding In Progress');
        error.statusCode = 400;
        throw error;
      }
     }else{
      const duplicateCompletedRecord = await Boarding.findOne({
        patient_id: patient_id,
        status: 'Completed',
        start_date: start_date,
        end_date: end_date,
      });
    
      if (duplicateCompletedRecord) {
        const error = new Error('Duplicate Record Found');
        error.statusCode = 400;
        throw error;
      }
     }

          
      const newBoarder = new Boarding({patient_id, start_date, end_date, notes, status});
      const output= await newBoarder.save();
      if (output) {
        console.log(output)
         const data = {
            module_id: output._id,
            module_name:'Boarding',
            amount:amount,
            description:description,
          }
          const newPay = new Payment(data);
          const paymentOutput= await newPay.save();
            if (paymentOutput) {
              res.status(201).json({ message: "Boarding Added Successfully", paymentOutput });
              
            }
      
          
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})

export const getBoarderById = asyncHandler(async (req, res) => {
    const { id } = req.query;

   const payment = await Payment.findOne({ module_id: id })
  .populate({
    path: 'module_id',
    model: 'Boarding', // Model name for the reference
  })
  
    if (payment) {
      console.log(payment);
      res.status(200).json(payment);
    } else {
      console.error(err);
      const error = new Error('Boarder not found');
      error.statusCode = 404; // Correct the status code to 404 for "Not Found"
      throw error;

    }
  
  
    // if (id) {
    //   const boarder = await Boarding.findById(id).populate("patient_id")
  
    //   if (boarder) {
    //     res.status(200).json(boarder);
    //   } else {
    //     const error = new Error('Boarder not found');
    //     error.statusCode = 404; // Correct the status code to 404 for "Not Found"
    //     throw error;
    //   }
    // } else {
    //   const error = new Error('Invalid Request');
    //   error.statusCode = 400;
    //   throw error;
    // }
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

  export const editBoarderStatus = asyncHandler(async (req, res) => {
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
  
    
     const updatedBoarderStatus = await Boarding.findByIdAndUpdate(
      id,
      { status },
      { runValidators: true, new: true }
    );

    if (updatedBoarderStatus) {
      return res.status(201).json({ message: 'Boarding Status updated successfully' });
    }else{
        const error = new Error('Boarding Info Not Added');
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