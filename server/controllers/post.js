//** IMPORTS */
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/** CREATE POST */
export const createPost = async (req, res) => {
  try {
    const { userId, postsPath, description, location } = req.body;
    const user = await User.findById({ _id: userId });
    const newPost = new Post({
      userId,
      userProfilePicture: user.profilePicture,
      userName: user.userName,
      posts: postsPath,
      description,
      location,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const allUserPosts = await Post.find({ userId: userId });
    res.status(201).json({ posts: allUserPosts });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

//** GET POST */
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
//** USER POSTS */
export const userPosts = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const posts = await Post.find({ userId: user._id });
    res.status(200).json({ posts: posts });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
//** USER FOLLOWING POSTS */
export const followingUserPosts = async (req, res) => {
  try {
    const { userName } = req.body;
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }else if(user.following.length === 0){
        return res.status(400).json({error :"No Posts to fetch"})
    }
    const allPosts = await Post.find({ userId: { $in: [user._id,...user.following] } }).sort({
      createdAt: -1,
    })
    .skip(skip).limit(limit);
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//** LIKE */
export const likePost = async(req,res)=>{
  try{
    const { userName, postId } = req.body;
    const user = await User.findOne({userName: userName});
    const post = await Post.findById(postId);
    if(!user || !post) return res.status(400).json({error:"Not found!"});
    const isLiked = post.likes.get(user._id);
    if(isLiked){
      post.likes.delete(user._id);
    }else{
      post.likes.set(user._id,true);
    }
    const updatedPost = await Post.findByIdAndUpdate(postId,{likes: post.likes},{new: true});
    res.status(200).json(updatedPost);
  }catch(error){
    res.status(400).json({error:error.message});
  }
};
//** COMMENTS */
export const addComment = async(req,res)=>{
  try{
    const { postId, comment, userName, profilePicture } = req.body;
    const post = await Post.findOne({ _id: postId });
    if(!post) return res.status(404).json({error: "Post not found!"});
    const commentData = new Comment({
      userName,
      profilePicture,
      comment,
    });
    post.comments.push(commentData);
    const addedComment = await post.save();
    res.status(200).json({post: addedComment})
  }catch(error){
    res.status(401).json({ error: error.message });
  }
};

