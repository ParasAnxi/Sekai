//** IMPORTS */
import express from "express";
import { changeInfo, changePassword, changeProfilePic, loginUser, refreshUser, registerUser, sendLink } from "../controllers/auth.js";
import { fileStorage, upload } from "../controllers/fileStorage.js";
//** CONFIG */
const router = express.Router();

//** REGISTER */
router.post("/register",registerUser);
//** LOGIN */
router.post("/login",loginUser);
router.post("/refreshuser",refreshUser);
//** EMAIL AND PASSWORD */
router.post("/resetpasswordlink",sendLink);
router.post("/changepassword/:id/:token",changePassword);
router.post("/changeinfo/:userName",changeInfo);
//** PROFILE PICTURE */
router.post("/profilepic/:userName",upload.single("picture"),fileStorage,changeProfilePic);

export default router;
