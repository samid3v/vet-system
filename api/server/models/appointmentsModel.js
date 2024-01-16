import mongoose from "mongoose";
import Payment from "./paymentModel.js";

const AppointmentSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true,
    },
    vet:{
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

AppointmentSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    const module_id = this._id;
    await Payment.deleteMany({ module_id });
    next();
  });

  AppointmentSchema.post('deleteMany', async function() {
    console.log('delete appointment')
    await Payment.deleteMany({ module_id:this._conditions._id} );
  });

 const Appointment = mongoose.model('Appointments', AppointmentSchema)

 export default Appointment