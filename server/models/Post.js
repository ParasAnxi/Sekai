//** IMPORTS */
import mongoose from "mongoose";

//** POST SCHEMA */
const postSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    userProfilePicture:{
        type:String,
        default: "",
    },
    userName:{
        type:String,
        required:true,
    },
    posts:{
        type:Array,
        of:String,
        required:true,
        default:[],
    },
    description:{
        type:String,
        default:"",
        max:1000,
    },
    location:{
        type:String,
        default:"",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
},{ timestamps : true });

const Post = mongoose.model("Post",postSchema);
export default Post;