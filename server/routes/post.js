//** IMPORTS */
import express from "express";
import { upload } from "../controllers/fileStorage.js";
import { addComment, createPost, followingUserPosts, getPost, likePost, userPosts } from "../controllers/post.js";

//** CONFIG */
const router = express.Router();

//** CREATE */
router.post("/create",upload.array("posts"),createPost);
router.get("/:userName/userposts",userPosts);
router.post("/followingposts",followingUserPosts);
router.get("/getpost/:postId",getPost);
router.post("/addcomment",addComment);
router.patch("/likepost",likePost);

export default router;