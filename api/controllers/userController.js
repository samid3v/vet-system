import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt"

import User from '../server/models/userModel.js';
import Credential from '../server/models/loginModel.js';


export const getUser = (req, res) => {
    res.send("from controller")
}

export const userLogin = asyncHandler(async (req, res) => {
        const { username, password } = req.body;

        if (username==="" || password==="") {
          
          const error = new Error("Logins Required");
          error.statusCode = 400;
          throw error;
        }

        const findUser= await Credential.findOne({username})


        if (!findUser) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
          return
        
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if ( passwordMatch) {
          const user = await Credential.findOne({ username }).select('-password').populate('user');


          const token = jwt.sign({ username }, process.env.API_SECRET, { expiresIn: '24h' });
       
          res.cookie('token', token, { httpOnly: true , domain: 'localhost'})
          .status(200)
          .json({ message: 'Login successful',
            user,
      });
        } else {
          const error = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
        }
        
        
      
})

export const userSignUp = asyncHandler(async (req, res) => {
    const { username, name, email, password, role, phone } = req.body;

    console.log('register')
    
    if (username === "" || email == "" || phone == "" || password==="" || name==='' ) {
      const error = new Error("check your inputs");
      error.statusCode = 400;
      throw error;
      
    }else{

      const existingMail = await User.findOne({ email });
      const existingUserName = await Credential.findOne({ username });
  
      if (existingUserName) {
        const error = new Error("Username already taken");
        error.statusCode = 400;
        throw error;
      }

      if (existingMail) {
        const error = new Error("Email already taken");
        error.statusCode = 400;
        throw error;
      }
  
      // Create a new user with the hashed password
      const newUser = new User({ email,  phone, role, name });
      const output= await newUser.save();
  
      if (output){

        const addCredentials = new Credential({user:output._id, username, password})
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

export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
});