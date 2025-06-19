//** IMPORTS */
import { Server } from "socket.io";
import Message from "../models/Message.js";

//** CONFIG */
const onlineUsers = new Map();

export const webSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  //** CONNECTION */
  io.on("connection", (socket) => {
    // console.log("user connceted")
    socket.on("addOnlineUsers", (userName) => {
      if (onlineUsers.has(userName)) {
        onlineUsers.get(userName).push(socket.id);
      } else {
        onlineUsers.set(userName, [socket.id]);
      }
    });
    //** SEND MESSAGE */
    socket.on("sendMessage", async (data) => {
      const receiverSockets = onlineUsers.get(data.receiver);
      // console.log(data);

      const newMessage = new Message({
        participants: [data.sender, data.receiver],
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        sentAt: data.time,
        messageType: "text",
        seen: false,
      });
      await newMessage.save();

      if (receiverSockets) {
        receiverSockets.forEach((socketId) => {
          socket.to(socketId).emit("receiveMessage", data);
        });
      } else {
        console.log("Receiver is offline");
      }
    });
    //** DISCONNECT */
    socket.on("disconnect", () => {
      for (const [userName, sockets] of onlineUsers.entries()) {
        const filteredSockets = sockets.filter((id) => id !== socket.id);
        if (filteredSockets.length > 0) {
          onlineUsers.set(userName, filteredSockets);
        } else {
          onlineUsers.delete(userName);
        }
      }
    });
  });
};
