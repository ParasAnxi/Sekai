//** IMPORTS */
import Post from "../models/Post.js";
import User from "../models/User.js";

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
    // const page = req.query.page;
    // const limit = req.query.limit;
    // const skip = (page - 1) * limit;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }else if(user.following.length === 0){
        return res.status(400).json({error :"No Posts to fetch"})
    }
    const allPosts = await Post.find({ userId: { $in: user.following } }).sort({
      createdAt: -1,
    })
    // .skip(skip).limit(limit);
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
