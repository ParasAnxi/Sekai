//** IMPORTS */
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newUser = new User({
        userName,
        email,
        password: hashPassword,
    });
    const saveUser = await newUser.save();
    res.status(201).json({user:saveUser, message: "User Registered Successfully!"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
