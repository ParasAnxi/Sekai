//** IMPORTS */
import express from "express";
import { getParticipantsChats, messagedPeople, saveMessage } from "../controllers/message.js";

//** CONFIG */

const router = express.Router();

//** GET USERS */
router.post("/sendmessage", saveMessage);
router.post("/getchats", getParticipantsChats);
router.post("/getmessagedpeople", messagedPeople);

export default router;
