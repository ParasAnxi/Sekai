//** IMPORTS */
import mongoose, { SchemaType } from "mongoose";
import { Schema } from "mongoose";
/** USER SCHEMA */
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      trim: true,
      unique: true,
    },
    nickName: {
      type: String,
      min: 2,
      max: 10,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 40,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
    notifications: {
      type: Array,
      default: [],
      ref: "Notification",
    },
  },
  { timestamps: true }
);
//** FUNCTIONS */
userSchema.methods.addFollower = function(userId) {
  if (!this.followers.includes(userId)) {
    this.followers.push(userId);
  }
};

userSchema.methods.removeFollower = function(userId) {
  this.followers = this.followers.filter(followerId => !followerId.equals(userId));
};

userSchema.methods.addFollowing = function(userId) {
  if (!this.following.includes(userId)) {
    this.following.push(userId);
  }
};

userSchema.methods.removeFollowing = function(userId) {
  this.following = this.following.filter(followingId => !followingId.equals(userId));
};

const User = mongoose.model("User", userSchema);
export default User;