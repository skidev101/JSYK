import User from "../models/User.js";

export const getPublicProfile = async (req, res) => {
  try {
    const { profileSlug } = req.params;

    const user = await User.findOne({ profileSlug });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        code: "USER_NOT_FOUND",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let viewsDate = user.viewsDate ? new Date(user.viewsDate) : null;
    if (viewsDate) viewsDate.setHours(0, 0, 0, 0);

    let updatedUser;

    if (!viewsDate || viewsDate.getTime() !== today.getTime()) {
      user.viewsToday = 0;
      user.viewsDate = today;
      await user.save();
    }

    user.viewsToday += 1;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        username: updatedUser.username,
        profileImgUrl: updatedUser.profileImgUrl,
        jsykLink: updatedUser.profileSlug,
        bio: updatedUser.bio,
        profileSlug: updatedUser.profileSlug,
      },
    });
  } catch (err) {
    console.error("Error getting public profile:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const checkUsernameAvailability = async (req, res) => {
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

export const updateProfile = async (req, res) => {
  const { username, email, bio, profileImgUrl, fileId } = req.body;
  const { uid } = req.user;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (profileImgUrl !== undefined && fileId !== undefined) {
      if (user.profileImgFileId && user.profileImgFileId !== fileId) {
        try {
          await imagekit.deleteFile(user.profileImgFileId);
          console.log("Deleted old profile image:", user.profileImgFileId);
        } catch (err) {
          console.error("Failed to delete old profile image:", err);
        }
      }

      user.profileImgUrl = profileImgUrl;
      user.profileImgFileId = fileId;
    }

    await user.save();
    console.log("successfully updated user");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImgUrl: user.profileImgUrl,
        jsykLink: user.profileSlug,
      },
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
