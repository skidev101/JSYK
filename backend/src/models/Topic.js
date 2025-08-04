const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  profileSlug: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    maxLength: 80
  },
  slug: {
    type: String,
    required: true
  },
  topicId: {
    type: String,
    required: true
  },
  topicLink: {
    type: String,
    required: true
  },
  themeColor: {
    type: String,
    default: null
  },
  topicImgUrls: {
    type: [
      {
        url: String,
        fileId: String,
        expiresAt: Date
      }
    ],
    default: undefined
  },
  isActive: {
    type: Boolean,
    default: false
  },
  lastMessageAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true 
});

topicSchema.index({ profileSlug: 1, topicId: 1 });

module.exports = mongoose.model("Topic", topicSchema);