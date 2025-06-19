//** IMPORTS */
import User from "../models/User.js";

//** EMAIL EXISTS */
export const emailExist = async(req,res)=>{
    try{
        const { email } = req.body;
        const exist = await User.findOne({email: email});
        if(exist){
            res.status(200).json({value: true})
        }else{
            res.status(200).json({value: false})
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
};
//** USERNAME */
export const userNameExist = async(req,res)=>{
    try{
        const { userName } = req.body;
        const exist = await User.findOne({userName: userName });
        if (exist) {
          res.status(200).json({ value: true });
        } else {
          res.status(200).json({ value: false });
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
};
