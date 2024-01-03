import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true,
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
    reason:{
        type: String,
        required:true,
        
    },
    date:{
        type: Date,
        required:true,
    },
    notes:{
        type: String
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Canceled'],
        default: 'Booked',
      },
    
},{timestamps:true})

 const Appointment = mongoose.model('Appointments', AppointmentSchema)

 export default Appointment