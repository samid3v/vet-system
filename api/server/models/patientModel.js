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

PatientSchema.post('deleteOne',  async function() {
    console.log('deleting patients references')
    const patientId = this._conditions._id;

    const vaccines = await Vaccine.find({patient:patientId})
    
    const clinics = await Appointment.find({ patient: patientId });
  
    const treatments = await Treatment.find({ patient: patientId });
  
    const boarders = await Boarding.find({ patient_id: patientId });
  
    // await Vaccine.deleteMany({ patient: patientId });

    await Promise.all(vaccines.map(vaccine => Vaccine.deleteOne({_id:vaccine._id})))
    await Promise.all(clinics.map(clinic => Appointment.deleteOne({_id:clinic._id})))
    await Promise.all(treatments.map(treatment => Treatment.deleteOne({_id:treatment._id})))
    await Promise.all(boarders.map(boarder => Boarding.deleteOne({_id:boarder._id})))
  
  
  });

 const Patient = mongoose.model('Patients', PatientSchema)

 export default Patient