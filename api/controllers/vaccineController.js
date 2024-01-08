import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';
import User from '../server/models/userModel.js';
import Patient from '../server/models/patientModel.js';
import Vaccine from '../server/models/vaccineModel.js';
import Dose from '../server/models/dosesModel.js';

export const getAllVaccines = asyncHandler(async(req, res) => {

  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalDocs = await Vaccine.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
   const vaccines = await Treatment.find().populate("patient")
   .sort({ createdAt: -1 })
   .skip(skip)
   .limit(pageSize);
    
    
   if (vaccines) {
    
    res.status(200).json(
      {
        page,
        pageSize,
        totalDocs,
        totalPages, 
        data: vaccines,
      }
    )
    
   }
})

export const addTreatment = asyncHandler(async(req, res) => {
    const {name, notes, total_doses, amount, description, patient} = req.body

    if (!name || !patient || !amount || !patient ) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }

     const patientExist = await Patient.findOne({ _id:patient });
     if (!patientExist) {
          const error = new Error("Patient doesnt exist");
          error.statusCode = 404;
          throw error;
       }
   
       
     const vaccine = new Vaccine({
          patient,
          name,
          total_doses,
          notes,
        });
         
        
      const output= await vaccine.save();
      if (output) {
        const data = {
          module_id: output._id,
          module_name:'Vaccine',
          amount:amount,
          payment_bal:amount,
          description:description,
        }
        const newPay = new Payment(data);
        const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({ message: "Vaccine Added Successfully" });
            
          }
      }else{
          const error = new Error("something wrong happenned, try again");
          error.statusCode = 400;
          throw error;
      }

})


  export const editTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const {pay_id,  name, notes, total_doses, amount, description, patient} = req.body
  
    if (!name || !patient || !amount || !patient ) {
      const error = new Error("Check Required Inputs");
      error.statusCode = 400;
      throw error;
   }

   const patientExist = await Patient.findOne({ _id:patient });
   if (!patientExist) {
       const error = new Error("Patient doesnt exist");
       error.statusCode = 404;
       throw error;
    }

    const payExist = await Payment.findOne({ _id:pay_id });
   if (!payExist) {
       const error = new Error("Payment doesnt exist");
       error.statusCode = 404;
       throw error;
    }

    const transactions = await Transaction.find({ payment_id: pay_id });

    const totalPayment = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount_paid;
    }, 0);

    if (totalPayment>amount) {
          const error = new Error("Amount is less the amount paid ");
          error.statusCode = 404;
          throw error;
    }
    let payment_bal = payExist.payment_bal
    let status = payExist.status

    if (totalPayment==amount) {
      status= 'Completed'
    }

    if (payExist.amount>amount) {
       payment_bal = payExist.payment_bal-(payExist.amount - amount)
    }

    const updatedAppointment = await Vaccine.findByIdAndUpdate(id, {
      name,
      total_doses,
      notes,
      patient,
    }, { new: true });

    if (updatedAppointment) {
          const updatePay = await Payment.findByIdAndUpdate(pay_id, {
          amount,
          payment_bal,
          status,
          description,
        },{ new: true } );
          if (updatePay) {
            return res.status(201).json({ message: 'Vaccine updated successfully' });

          }
    }else{
        const error = new Error('something wrong happenned, try again');
        error.statusCode = 400;
        throw error;
    }

    
  });

  export const deleteTreatment = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (id) {
        try {
            const treatmentExist = await Vaccine.findById(id);

            if (!treatmentExist) {
                const error = new Error('Vaccine Not Found');
                error.statusCode = 404;
                throw error;
            }

            const payExist = await Payment.findOne({ module_id: id, module_name: 'Vaccine' });

            if (payExist !== null) {
                const deleteTreatment = await treatmentExist.deleteOne();

                if (deleteTreatment) {
                    const transactionsExist = await Transaction.exists({ payment_id: payExist._id });

                    if (transactionsExist) {
                        const deleteT = await Transaction.deleteMany({ payment_id: payExist._id });
                        const deleteD = await Dose.deleteMany({ vaccine: payExist._id });

                        if (!deleteT || !deleteD) {
                            throw new Error('Failed to delete related Tables records');
                        }
                    }

                    // Delete Payment record
                    const deletePay = await payExist.deleteOne();
                    if (!deletePay) {
                        throw new Error('Failed to delete related Payment record');
                    }

                    res.status(201).json({ message: 'Vaccine record deleted successfully' });
                } else {
                    throw new Error('Failed to delete Vaccine record');
                }
            } else {
                const deleteTreatment = await treatmentExist.deleteOne();
                if (!deleteTreatment) {
                    throw new Error('Failed to delete Treatment record');
                }

                res.status(201).json({ message: 'Vaccine record deleted successfully (no Payment)' });
            }
        } catch (error) {
            console.error('Error deleting Vaccine:', error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }
    } else {
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
});
