import asyncHandler from "express-async-handler";

import User from "../server/models/userModel.js";
import Patient from "../server/models/patientModel.js";

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({ role: "customer" }).select("-password");

  if (customers) {
    res.status(200).json(customers);
  } else {
    const error = new Error("No Customers Found");
    error.statusCode = 404;
    throw error;
  }
});

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailPattern.test(email);
}

export const AddCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (phone.length !== 10) {
    const error = new Error("invalid phone number");
    error.statusCode = 400;
    throw error;
  }

    if (!validateEmail(email)) {
      const error = new Error("invalid email");
      error.statusCode = 400;
      throw error;
    }

  if (name == "" || phone == "" ||  email == "") {
    const error = new Error("check your inputs");
    error.statusCode = 400;
    throw error;
  }

  const existingPhone = await User.findOne({ phone });
  const existingMail = await User.findOne({ email });

  if (existingPhone) {
    const error = new Error("Phone already exists");
    error.statusCode = 400;
    throw error;
  }

    if (existingMail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }
    
  

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      phone,
      username: phone,
      role: "customer",
    });
    const output = await newUser.save();

    if (output) {
      res
        .status(201)
        .json({
          message: "Customer registered successfully",
          customer: {
            _id: output._id,
            name: output.name,
            email: output.email,
            phone: output.phone,
          },
        });
    } else {
      const error = new Error("something wrong happenned, try again");
      error.statusCode = 400;
      throw error;
    }
  
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const customer = await User.findById(id).select("-password");

    if (customer) {
      const patients = await Patient.find({ owner: id });
      const customerWithPatients = {
        ...customer.toObject(),
        patients: patients,
      };
      res.status(200).json(customerWithPatients);
    } else {
      const error = new Error("Customer  not found");
      error.statusCode = 404; // Correct the status code to 404 for "Not Found"
      throw error;
    }
  } else {
    const error = new Error("Invalid Request");
    error.statusCode = 400;
    throw error;
  }
});

export const editCustomer = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const updateData = req.body;

  if (!updateData.name || !updateData.phone) {
    const error = new Error("Check Required Fields");
    error.statusCode = 400;
    throw error;
  }

  const updatedPatient = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (updatedPatient) {
    return res.status(201).json({ message: "Customer updated successfully" });
  } else {
    const error = new Error("Customer Not Found");
    error.statusCode = 400;
    throw error;
  }
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const deleteCustomer = await User.findByIdAndRemove(id);

    if (!deleteCustomer) {
      const error = new Error("Customer Not Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ message: "Customer deleted successfully" });
  } else {
    const error = new Error("Invalid Request");
    error.statusCode = 400;
    throw error;
  }
});
