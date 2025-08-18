const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImgUrl: {
      type: String,
      default: "",
    },
    profileImgFileId: {
      type: String,
      default: "",
    },
    profileSlug: {
      type: String,
      required: true,
      unique: true,
    },
    viewsToday: {
      type: Number,
      default: 0,
    },
    viewsDate: {
      type: Date,
      default: () => new Date()
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
