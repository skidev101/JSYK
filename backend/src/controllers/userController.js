import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Message from "../models/Message.js";
import admin from "firebase-admin";

const checkUsername = async (req, res) => {
  try {
    const username = req.query.username?.trim();

    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({
         success: true,
         available: false,
         message: "username is already taken",
      });
    }

    res.status(200).json({
      success: true,
      available: true,
      message: "username is available",
   });
  } catch (err) {
    console.error("Error checking username availability:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};



const deleteUser = async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        code: "USER_NOT_FOUND",
      });
    }

    const fileIdsToDelete = [];
    if (user.fileId) fileIdsToDelete.push(user.fileId);

    const topics = await Topic.find({ uid });
    topics.forEach((topic) => {
      if (topic.fileId) fileIdstoDelete.push(topic.fileId)
    });

    for (const fileId of fileIdsToDelete) {
      try {
        await imagekit.deleteFile(fileId);
      } catch (err) {
        console.warn(`Failed to delete ImageKit file ${fileId}:`, err.message);
      }
    }

    await Promise.all([
      Topic.deleteMany({ uid }),
      Message.deleteMany({ uid }),
      User.deleteOne({ uid })
    ]);

    try {
      await admin.auth.deleteUser(uid);
      console.log("user now deleted from firebase");
    } catch (err) {
      console.error("Firebase delete failed:", err.message);
    }

  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
} 



module.exports = { checkUsername, deleteUser };
