//** IMPORTS */
import express from "express";
import { upload } from "../controllers/fileStorage.js";
import { createPost, userPosts } from "../controllers/post.js";

//** CONFIG */
const router = express.Router();

//** CREATE */
router.post("/create",upload.array("posts"),createPost);
router.get("/:userName/userposts",userPosts);

export default router;