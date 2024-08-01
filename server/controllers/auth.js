//** IMPORTS */
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/emailDetail.js";

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
        const { email, password, remember } = req.body;
        const user = await User.findOne({ email : email });
        if(!user){
            return res.status(404).json({ error: "User Not Found!!" })
        }
        const verifyPassword = await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(401).json({ error: "Invaild credentials!!"})
        }
        
        if(remember === true){
          const token = jwt.sign({ id: user._id},process.env.JWT_SECRET,{
            expiresIn: "30d"
          })
          user.password = undefined;
          user.resetPasswordToken = undefined;
          res.status(200).json({ token, user });
        }
        else{
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10m",
          });
          user.password = undefined;
          user.resetPasswordToken = undefined;
          res.status(200).json({ token, user});
        }
    }catch(error){
        res.status(401).json({ error: error.message })
    }
};

//** RESSET PASSWORD LINK */
export const sendLink = async(req, res)=>{
  const { email } = req.body;
  try{
    const user = await User.findOne({ email: email });
    if(user){
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
        expiresIn: '15m'
      });
      const updatedData = await User.findByIdAndUpdate(
        { _id: user._id}, {resetPasswordToken: token },
        { new: true }
      );
      const data = await updatedData.save();
      const resetPasswordLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
      const mailData = {
        toEmail: email,
        title: "Reset Password Link For Sekai!",
        message: `This is the link to reset password for your sekai account.< ${resetPasswordLink} >This link will expire in 10minutes. Please Do not share this link with anyone!`
      }
      const response = await sendMail(mailData);
      res.status(200).json({message: response});
    }else{
      res.status(404).json({ error: error });
    }
  }
  catch(error){
    res.status(404).json({ error: error })
  }
};

//** CHANGE PASSWORD */
export const changePassword = async(req, res)=>{
  const { id, token } = req.params;
  const { password } = req.body;
  try{
      const user = await User.findOne({ _id: id });
      if(!user) return res.status(404).json({error: "User Not Found!" });
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      if(verify){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newData = await User.findByIdAndUpdate({_id:id},{password:hashPassword},{new:true});
        await newData.save();
        res.status(200).json({message: "Password Changed Successfully."});
      }else{
        res.status(403).json({error: "User is not authorized!!"});
      }
  }catch(error){
      res.status(400).json({error: error})
  }
};
//** PROFILE PIC */
export const changeProfilePic = async(req, res)=>{
  const { userName } = req.params;
  const { profilePicture } = req.body;
  try{
    const user = await User.findOne({ userName: userName});
    const newProfilePic =  await User.findByIdAndUpdate({_id:user.id},{profilePicture:profilePicture},{new:true});
    const updatedUser = await newProfilePic.save();
    updatedUser.password = undefined;
    updatedUser.resetPasswordToken = undefined;
    res.status(201).json({user: updatedUser});
  }catch(error){
    res.status(400).json({ error:error });
  }
};
//** NAME AND BIO */
export const changeInfo = async(req, res)=>{
  const { userName } = req.params;
  const { nickName, bio } = req.body;
  try{
    const user = await User.findOne({ userName: userName});
    const newInfo =  await User.findByIdAndUpdate({_id:user.id},{nickName:nickName, bio:bio},{new:true});
    const updatedUser = await newInfo.save();
    updatedUser.password = undefined;
    updatedUser.resetPasswordToken = undefined;
    res.status(201).json({ user: updatedUser });
  }catch(error){
    res.status(400).json({ error:error });
  }
};