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

/** LOGIN */
export const loginUser = async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email : email });
        if(!user){
            return res.status(404).json({ message: "User Not Found!!" })
        }
        const verifyPassword = await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(401).json({ message: "Invaild credentials!!" })
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        user.password = undefined;
        res.status(200).json({ token, user });
    }catch(error){
        res.status(401).json({ error: error.message })
    }
}