//** IMPORTS */
import mongoose from "mongoose";

/** USER SCHEMA */
const commentSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    userName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    comment:{
        type:String,
        required:true,
    },
    commentLikes:{
        type:Map,
        of:Boolean,
    },
    commentReplies:{
        type:Array,
        default:[],
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", commentSchema);
export default Comment;
