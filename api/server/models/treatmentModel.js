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
    date: {
        type: Date
      },
    
},{timestamps:true})

 const Treatment = mongoose.model('Treatments', TreatmentSchema)

 export default Treatment