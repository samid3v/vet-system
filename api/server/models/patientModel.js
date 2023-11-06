import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
    },
    species:{
        type: String,
    },
    breed:{
        type: String,
    },
    age:{
        type: Number,
        min: 0,
        max: 60
    },
    weight:{
        type: Number,
        min: 0,
        max: 1000
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
    
},{timestamps:true})

 const Patient = mongoose.model('Patients', PatientSchema)

 export default Patient