const User = require("../models/User");
const { generateUniqueSlug } = require("../utils/usernameUtils");

const getCurrentUser = async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "No active user or user does not exist"
      })
    }

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        jsykLink: user.profileSlug,
        memberSince: user.createdAt
      }
    });
  } catch (err) {
    console.error("authentication error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR"
    });
  }
};

const handleAuth = async (req, res) => {
  const { uid, username, email, profileImgUrl } = req.user;


  try {
    // Check if user already exists
    let user = await User.findOne({ uid });
    if (!user) {
      const profileSlug = await generateUniqueSlug(username, User);
      console.log('profile slug at sign up:', profileSlug)

      if (!profileSlug) {
        return res.status(400).json({
          success: false,
          message: "Invalid username",
          code: "FORBIDDEN_USERNAME"
        })
      }

      user = await User.create({
        uid,
        username,
        email,
        profileImgUrl,
        profileSlug,
      });
    }

    console.log("User authenticated:", user);

    res.status(200).json({
      success: true,
      data: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        jsykLink: user.jsykLink,
        memberSince: user.createdAt
      }
    });
  } catch (err) {
    console.error("Error handling authentication:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR"
    });
  }
};

module.exports = {
  getCurrentUser,
  handleAuth,
};
