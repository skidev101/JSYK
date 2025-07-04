const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  const { uid } = req.user;

  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleAuth = async (req, res) => {
  const { uid, username, email, profileImgUrl } = req.user;

  console.log(req.user);

  try {
    // Check if user already exists
    let user = await User.findOne({ uid });
    if (!user) {
      // Create a new user if not found
      user = await User.create({
        uid,
        username,
        email,
        profileImgUrl,
        profileLink: `https://jsyk.vercel.app/${encodeURIComponent(username)}`
      });
    }

    console.log("User authenticated:", user);

    res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
      },
    });
  } catch (error) {
    console.error("Error handling authentication:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getCurrentUser,
  handleAuth,
};
