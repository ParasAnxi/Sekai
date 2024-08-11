//** IMPORTS */
import mongoose from "mongoose";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
//** SEARCH USERs */
export const searchUser = async (req, res) => {
  try {
    const { userName } = req.body;
    if (userName !== "") {
      const users = await User.find({
        userName: { $regex: `^${userName}`},
      });
      res.status(200).json({ users: users });
    } else if (userName === "") {
      res.status(200).json({ users: [] });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
//** USER PROFILE */
export const getUserProfile = async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) res.status(404).json({ error: "User Not Found!" });
    user.email = undefined;
    user.password = undefined;
    user.resetPasswordToken = undefined;
    user.notifications = undefined;
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(404).status({ error: error });
  }
};
//** FOLLOW */
export const followUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userName, toFollowUserName } = req.body;
    const user = await User.findOne({ userName: userName }).session(session);
    const toFollowUser = await User.findOne({ userName: toFollowUserName }).session(session);

    if (!user || !toFollowUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.following.includes(toFollowUser._id)) {
      user.addFollowing(toFollowUser._id);
      toFollowUser.addFollower(user._id);

      const notification = new Notification({
        userId: user._id,
        otherUserId: toFollowUser._id,
        typeOf: "follow",
        title: `${user.userName} started following you.`,
        userUserName:user.userName,
        userProfilePicture: user.profilePicture,
        expires_at: null
      });
      toFollowUser.notifications.push(notification);

      // await notification.save();
    }

    const updatedUser = await user.save({ session });
    const updatedFollower = await toFollowUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    updatedUser.password = undefined;
    updatedUser.resetPasswordToken = undefined;
    updatedUser.notifications = undefined;
    updatedUser.email = undefined;

    updatedFollower.password = undefined;
    updatedFollower.resetPasswordToken = undefined;
    updatedFollower.notifications = undefined;
    updatedFollower.email = undefined;

    res.status(200).json({ user: updatedUser, following: updatedFollower });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//** UNFOLLOW */
export const unfollowUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userName, toUnfollowUserName } = req.body;

    const user = await User.findOne({ userName: userName }).session(session);
    const toUnFollowUser = await User.findOne({ userName: toUnfollowUserName }).session(session);

    if (!user || !toUnFollowUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "User not found" });
    }

    if (user.following.includes(toUnFollowUser._id)) {
      user.removeFollowing(toUnFollowUser._id);
      toUnFollowUser.removeFollower(user._id);
    }

    const updatedUser = await user.save({ session });
    const updatedFollower = await toUnFollowUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    updatedUser.password = undefined;
    updatedUser.resetPasswordToken = undefined;
    updatedUser.notifications = undefined;
    updatedUser.email = undefined;

    updatedFollower.password = undefined;
    updatedFollower.resetPasswordToken = undefined;
    updatedFollower.notifications = undefined;
    updatedFollower.email = undefined;

    res.status(200).json({ user: updatedUser, follower: updatedFollower });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
