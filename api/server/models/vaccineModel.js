import mongoose from "mongoose";
import Dose from "./dosesModel.js";
import Payment from "./paymentModel.js";

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
    enum: ['Pending', 'In Progress', 'Completed', 'Canceled'],
    default: 'Pending',
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

vaccinationSchema.post('deleteOne', async function (next) {
  const vaccine = this._id;
  await Dose.deleteMany({ vaccine });
  await Payment.deleteMany({ module_id:vaccine });

  next();
});

const Vaccine = mongoose.model('Vaccines', vaccinationSchema);

export default Vaccine;
