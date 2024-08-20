//** IMPORTS */
import express from "express";
import { upload } from "../controllers/fileStorage.js";
import { addComment, createPost, followingUserPosts, getPost, userPosts } from "../controllers/post.js";

//** CONFIG */
const router = express.Router();

//** CREATE */
router.post("/create",upload.array("posts"),createPost);
router.get("/:userName/userposts",userPosts);
router.post("/followingposts",followingUserPosts);
router.get("/getpost/:postId",getPost);
router.post("/addcomment",addComment);

export default router;