import mongoose from "mongoose";
import Payment from "./paymentModel.js";
import Transaction from "./transactionModel.js";

const BoardingSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true,
    },
    start_date:{
        type: Date,
    },
    end_date:{
        type: Date,
    },
    notes:{
        type: String
    },
    status: {
        type: String,
        enum: ['Booked', 'In Progress', 'Completed', 'Canceled'],
        default: 'Booked',
      },
      
    
},{timestamps:true})


 const Boarding = mongoose.model('Boarding', BoardingSchema)

 export default Boarding