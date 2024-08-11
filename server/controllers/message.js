//** IMPORTS */
import Message from "../models/Message.js";
import User from "../models/User.js";
//** MESSAGES */
export const saveMessage = async (req, res) => {
  try {
    const { sender, receiver, message, messageType } = req.body;
    const senderExist = await User.findOne({ userName: sender });
    const receiverExist = await User.findOne({ userName: receiver });
    if (!senderExist || !receiverExist) {
      return res.status(404).json({ error: "User not found!" });
    }
    const newMesssage = new Message({
      participants: [sender, receiver],
      sender: senderExist.userName,
      receiver: receiverExist.userName,
      message,
      messageType,
    });
    const saveMessage = await newMesssage.save();
    res.status(200).json({ message: saveMessage });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const messagedPeople = async (req, res) => {
  try {
    const { userName } = req.body;

    const allMessages = await Message.find({
      $or: [{ sender: userName }, { receiver: userName }],
    });

    const users = new Set();
    allMessages.forEach((message) => {
      if (message.sender !== userName) {
        users.add(message.sender);
      }
      if (message.receiver !== userName) {
        users.add(message.receiver);
      }
    });

    const userList = Array.from(users);

    const userDetails = await User.find({
      userName: { $in: userList },
    });

    const userListMap = new Map();
    userDetails.forEach((user) => {
      userListMap.set(user.userName, {
        userId: user._id,
        profilePicture: user.profilePicture,
      });
    });

    const enrichedUsers = userList.map((userName) => ({
      userName,
      ...userListMap.get(userName),
    }));

    res.status(200).json({ users: enrichedUsers });
  }catch (error) {
    res.status(401).json({ error: error.message });
  }
};
//** GET PARTICIPATNS MESSAGES */
export const getParticipantsChats = async (req, res) => {
  const { sender, receiver } = req.body;
  const senderExist = await User.findOne({ userName: sender });
  if (!senderExist) {
    return res.status(404).json({ error: "User not found!" });
  }
  const chats = await Message.find({
    participants: { $all: [sender, receiver] },
  }).sort({ updatedAt: 1 });
  const allMessages = chats.map((message) => {
    return {
      sender: message.sender,
      message: message.message,
      time: message.sentAt,
      seen: message.seen
    };
  });
  res.status(200).json({ messages: allMessages });
};
