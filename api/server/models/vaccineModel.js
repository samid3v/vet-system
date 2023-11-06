import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema({
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', // Reference to the animal receiving the vaccination
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
    },
    dateAdministered: {
      type: Date,
      required: true,
    },
    nextDueDate: {
      type: Date,
    },
    vetAdministered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the vet who administered the vaccine
    },
    notes: {
      type: String,
    },
  }, { timestamps: true });
  
  const Vaccine = mongoose.model('Vaccination', vaccinationSchema);
  
  module.exports = Vaccine;