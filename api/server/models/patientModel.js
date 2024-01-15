import mongoose from "mongoose";
import Boarding from "./boardingModel.js";
import Treatment from "./treatmentModel.js";
import Appointment from "./appointmentsModel.js";
import Vaccine from "./vaccineModel.js";

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

PatientSchema.post('deleteOne', async function (next) {
    const patientId = this._id;
    
    await Appointment.deleteMany({ patient: patientId });
  
    await Treatment.deleteMany({ patient: patientId });
  
    await Boarding.deleteMany({ patient_id: patientId });
  
    await Vaccine.deleteMany({ patient: patientId });
  
  
    next();
  });

 const Patient = mongoose.model('Patients', PatientSchema)

 export default Patient