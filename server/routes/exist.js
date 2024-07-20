//** IMPORTS */
import express from "express";
import { emailExist, userNameExist } from "../controllers/exist.js";

//** ROUTER */

const router = express.Router();

router.post("/email-exist",emailExist);
router.post("/user-name-exist",userNameExist);

export default router;