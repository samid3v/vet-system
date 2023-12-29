import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required:true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    notes:{
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