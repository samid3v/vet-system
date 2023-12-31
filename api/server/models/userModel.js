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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    password:{
        type: String,
        required: function () {
          return this.role !== 'customer';
        },
    },
    profile:String
    
},{timestamps:true})


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }
  });

  UserSchema.pre('deleteOne', async function (next) {
    const owner = this._id;
    await Patient.deleteMany({ owner });
    next();
  });

 const User = mongoose.model('Users', UserSchema)

 export default User