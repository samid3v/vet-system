import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    description:{
        type: String,
    },
    cost:{
        type: Number,
        min: 0,
        default:0
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
      },
    
},{timestamps:true})

 const Treatment = mongoose.model('Treatments', TreatmentSchema)

 export default Treatment