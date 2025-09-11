import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Message from "../models/Message.js";
import admin from "../config/firebase.js";

export const checkUsername = async (req, res) => {
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

export const deleteUser = async (req, res) => {
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

    const publicIdsToDelete = [];
    if (user.publicId) publicIdsToDelete.push(user.publicId);

    const topics = await Topic.find({ uid });
    topics.forEach((topic) => {
      if (topic.publicId) publicIdsToDelete.push(topic.publicId);
    });

    for (const publicId of publicIdsToDelete) {
      try {
        await imagekit.deleteFile(publicId);
      } catch (err) {
        console.warn(
          `Failed to delete ImageKit file ${publicId}:`,
          err.message
        );
      }
    }

    await Promise.all([
      Topic.deleteMany({ uid }),
      Message.deleteMany({ uid }),
      User.deleteOne({ uid }),
    ]);

    try {
      await admin.auth().getUser(uid);
      console.log("user found");
      await admin.auth().deleteUser(uid);
      console.log("user now deleted from firebase");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        console.warn(`Firebase user ${uid} already deleted`);
      } else {
        console.error("Firebase delete failed:", err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export default { checkUsername, deleteUser };
