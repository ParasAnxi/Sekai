//** IMPORTS */
import express from "express";
import { changePassword, loginUser, registerUser, sendLink } from "../controllers/auth.js";

//** CONFIG */
const router = express.Router();

//** LOGIN */
router.post("/register",registerUser);
//** REGISTER */
router.post("/login",loginUser);
//** EMAIL AND PASSWORD */
router.post("/resetpasswordlink",sendLink);
router.post("/changepassword/:id/:token",changePassword);

export default router;
