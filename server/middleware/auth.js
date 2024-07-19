//** IMPORTS */
import jwt from "jsonwebtoken";

/** AUTHORIZATION */
export const authorization = async(req, res, next)=>{
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.status(403).json({message: "Access Denied!! Not Authorized!"})
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(401).json({error: error.message, message: "User Unauthorized!"})
    }
}