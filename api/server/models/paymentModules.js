import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
    module_id:{
        type: String,
        required:true,
    },
    module_name:{
     type:String,
     enum: ['Appointments', 'Boarding', 'Vaccines', 'Treatment'],
     default: 'Pending',
    },
    amount:{
     type:Number,
     float:true,
     required:true,
    },
    status: {
     type: String,
     enum: ['Completed', 'Pending'],
     default: 'Pending',
   },
    description:{
     type:String,
    },
    
},{timestamps:true})

 const Payment = mongoose.model('Payments', PaymentsSchema)

 export default Payment