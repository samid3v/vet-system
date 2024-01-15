import mongoose from "mongoose";
import bcrypt from "bcrypt"
import Patient from "./patientModel.js";

const UserSchema = new mongoose.Schema({
    
    phone:{
        type: String,
        required:true,
        unique: true,
    },
    name:{
      type: String,
      required:true,
    },
    email:{
      type: String,
      unique:true,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'employee', 'admin'],
      required: true,
    },
    county:String,
    sub_county:String,
    ward:String,
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    profile:String
    
},{timestamps:true})


  UserSchema.post('deleteOne', async function (next) {
    const owner = this._id;
    await Patient.deleteMany({ owner });
    next();
  });

 const User = mongoose.model('Users', UserSchema)

 export default User