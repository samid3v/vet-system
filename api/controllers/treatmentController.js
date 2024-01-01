import asyncHandler from 'express-async-handler';
import Treatment from '../server/models/treatmentModel.js';
import Payment from '../server/models/paymentModel.js';
import Transaction from '../server/models/transactionModel.js';

export const getAllTreatments = asyncHandler(async(req, res) => {

  const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

  const skip = (page - 1) * pageSize;

  const totalDocs = await Treatment.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
   const treatments = await Treatment.find().populate("patient").populate("vet")
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
    const {name, notes, amount, date,description, patient, vet} = req.body

    if (!name || !patient) {
        const error = new Error("Check Required Inputs");
        error.statusCode = 400;
        throw error;
     }
        
      const newTreatment = new Treatment({name, notes, patient, date, vet});
      const output= await newTreatment.save();
      if (output) {
        const data = {
          module_id: output._id,
          module_name:'Treatment',
          amount:amount,
          payment_bal:amount,
          description:description,
        }
        const newPay = new Payment(data);
        const paymentOutput= await newPay.save();
          if (paymentOutput) {
            res.status(201).json({ message: "Treatment Added Successfully", paymentOutput });
            
          }
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
        try {
            const treatmentExist = await Treatment.findById(id);

            if (!treatmentExist) {
                const error = new Error('Treatment Not Found');
                error.statusCode = 404;
                throw error;
            }

            const payExist = await Payment.findOne({ module_id: id, module_name: 'Treatment' });

            if (payExist !== null) {
                const deleteTreatment = await treatmentExist.deleteOne();

                if (deleteTreatment) {
                    const transactionsExist = await Transaction.exists({ payment_id: payExist._id });

                    // Delete transactions if they exist
                    if (transactionsExist) {
                        const deleteT = await Transaction.deleteMany({ payment_id: payExist._id });

                        if (!deleteT) {
                            throw new Error('Failed to delete related Transaction records');
                        }
                    }

                    // Delete Payment record
                    const deletePay = await payExist.deleteOne();
                    if (!deletePay) {
                        throw new Error('Failed to delete related Payment record');
                    }

                    res.status(201).json({ message: 'Treatment record deleted successfully' });
                } else {
                    throw new Error('Failed to delete Treatment record');
                }
            } else {
                // No Payment record found, but still delete Treatment record
                const deleteTreatment = await treatmentExist.deleteOne();
                if (!deleteTreatment) {
                    throw new Error('Failed to delete Treatment record');
                }

                res.status(201).json({ message: 'Treatment record deleted successfully (no Payment)' });
            }
        } catch (error) {
            console.error('Error deleting treatment:', error);
            res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
        }
    } else {
        const error = new Error('Invalid Request');
        error.statusCode = 400;
        throw error;
    }
});
