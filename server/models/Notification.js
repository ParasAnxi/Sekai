//** IMPORTS */
import mongoose from "mongoose";

/** USER SCHEMA */
const notificationSchema = mongoose.Schema(
  {
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
