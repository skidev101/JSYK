const User = require("../models/User");

const getPublicProfile = async (req, res) => {
  try {
    const { slug } = req.params;

    const user = await User.findOne({ profileSlug: slug });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        code: "USER_NOT_FOUND",
      });
    }

    // increase profile views
    User.findByIdAndUpdate(user._id, {
      $inc: { profileViews: 1 },
      $set: { lastProfileView: new Date() }
    }).exec();

    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        jsykLink: user.profileSlug,
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

const checkUsernameAvailability = async (req, res) => {
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


const updateProfile = async (req, res) => {
   const { username, email, bio } = req.body;
   const { uid } = req.user;

   try {
      const user = await User.findOne({ uid });
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
            code: "USER_NOT_FOUND"
         })
      }

      if (username) {
         user.username = username;
      } else if (email) {
         user.email = email;
      } else if (bio) {
         user.bio = bio;
      }

      const updatedUser = await user.save();
      console.log("successfully updated user:", updatedUser);

      res.status(200).json({
         success: true,
         data: {
            username: user.username,
            email: user.email,
            profileImgUrl: user.profileImgUrl,
            jsykLink: user.jsykLink,
         }
      })
   } catch (err) {
      console.error("Error updating user profile:", err);
      res.status(500).json({
         success: false,
         message: "Internal server error",
         code: "INTERNAL_SERVER_ERROR",
      });
   }
}



module.exports = {
   getPublicProfile,
   checkUsernameAvailability,
   updateProfile
}