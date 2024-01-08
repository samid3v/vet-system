import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients', 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  total_doses: {
    type: Number,
    required: true,
  },
  doses_administered: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const Vaccine = mongoose.model('Vaccines', vaccinationSchema);

export default Vaccine;
