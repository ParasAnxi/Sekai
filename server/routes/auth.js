//** IMPORTS */
import express from "express";
import { changeInfo, changePassword, changeProfilePic, loginUser, registerUser, sendLink } from "../controllers/auth.js";
import { fileStorage, upload } from "../controllers/fileStorage.js";
//** CONFIG */
const router = express.Router();

//** LOGIN */
router.post("/register",registerUser);
//** REGISTER */
router.post("/login",loginUser);
//** EMAIL AND PASSWORD */
router.post("/resetpasswordlink",sendLink);
router.post("/changepassword/:id/:token",changePassword);
router.post("/changeinfo/:userName",changeInfo);
//** PROFILE PICTURE */
router.post("/profilepic/:userName",upload.single("picture"),fileStorage,changeProfilePic);

export default router;
