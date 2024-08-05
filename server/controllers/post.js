//** IMPORTS */
import Post from "../models/Post.js";
import User from "../models/User.js";

/** CREATE POST */
export const createPost = async(req, res)=>{
    try{
        const { userId, postsPath, description, location } = req.body;
        const user = await User.findById({ _id: userId });
        const newPost = new Post({
            userId,
            userProfilePicture: user.profilePicture,
            posts:postsPath,
            description,
            location,
            likes:{},
            comments:[],
        });
        await newPost.save();
        const allUserPosts = await Post.find({userId: userId});
        res.status(201).json({posts: allUserPosts});
    }catch(error){
        res.status(401).json({error: error});
    }
};

//** USER POSTS */
export const userPosts = async(req,res)=>{
    try{
        const { userName } = req.params;
        const user = await User.findOne({userName: userName});
        if(!user){
            res.status(404).json({error: "User not found!"});
        }
        const posts = await Post.find({userId: user._id});
        res.status(200).json({posts: posts});
    }catch(error){
        res.status(401).json({error: error});
    }
}