//** IMPORTS */
import mongoose from "mongoose";

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
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
