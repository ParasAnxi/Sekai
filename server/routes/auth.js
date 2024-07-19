//** IMPORTS */
import express from "express";
import { registerUser } from "../controllers/auth.js";

//** CONFIG */
const router = express.Router();

router.post("/register",registerUser);

export default router;
