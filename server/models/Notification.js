//** IMPORTS */
import mongoose from "mongoose";

/** USER SCHEMA */
const notificationSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    expire_at: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
    userId: {
      type: String,
      default: "",
    },
    otherUserId: {
      type: String,
      default: "true",
    },
    userUserName:{
      type:String,
      required: true,
    },
    userProfilePicture: {
      type: String,
    },
    typeOf: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
