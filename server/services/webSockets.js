//** IMPORTS */
import { Server } from "socket.io";

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
      onlineUsers.set(userName, socket.id);
      onlineUsers.forEach((value, key) => {
        console.log("this is good", key, value);
      });
    });
    //** SEND MESSAGE */
    socket.on("sendMessage", async (data) => {
      const receiverOnline = onlineUsers.get(data.receiver);
      if (receiverOnline) {
        socket.to(receiverOnline).emit("receiveMessage", data);
      }
    });
    //** DISCONNECT */
    socket.on("disconnect", () => {
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
          // console.log(`${key} disconnected`);
        }
      });
    });
  });
};
