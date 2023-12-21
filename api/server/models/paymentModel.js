import mongoose from "mongoose";

const PaymentsSchema = new mongoose.Schema({
    module_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'module_name',
    },
    module_name:{
     type:String,
     enum: ['Appointments', 'Boarding', 'Vaccines', 'Treatment'],
     default: 'Boarding',
    },
    amount:{
     type:Number,
     float:true,
     required:true,
     default: 0,
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