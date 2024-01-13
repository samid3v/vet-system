import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt"

import User from '../server/models/userModel.js';




export const getUser = (req, res) => {
    res.send("from controller")
}

export const userLogin = asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (username!=="" || password!=="") {
          const user = await User.findOne({ username });
          if (!user) {
            const error = new Error("Invalid user Credentials");
          error.statusCode = 401;
          throw error;
          return
          
          }
        const passwordMatch =  bcrypt.compare(password, user.password);

        if ( passwordMatch) {
          const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
      
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ message: 'Login successful', user:{
            id: user._id,
            username: user.username,
            role: user.role,
          } });
        } else {
          const error = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
        }
        }else {
          const error = new Error("Logins Required");
          error.statusCode = 400;
          throw error;
        }
      
})

export const userSignUp = asyncHandler(async (req, res) => {
    const { username, email, password, role, phone } = req.body;
    
    if (username == "" || email == "" || phone == "" || password=="" ) {
      const error = new Error("check your inputs");
      error.statusCode = 400;
      throw error;
      
    }else{

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      // Create a new user with the hashed password
      const newUser = new User({ email,  phone, role });
      const output= await newUser.save();
  
      if (output){

        const addCredentials = new Credential({username, password})
        const saveLogin = await addCredentials.save()
        if (saveLogin) {
          
          res.status(201).json({ message: 'User registered successfully'});
        }
      }else{
        const error = new Error("something wrong happenned, try again");
        error.statusCode = 400;
        throw error;
      }
    }
    


  
})