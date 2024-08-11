//** IMPORTS */
import mongoose from "mongoose";
/** MESSAGE SCHEMA */
const messageSchema = mongoose.Schema(
  {
    participants: {
      type: Array,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
