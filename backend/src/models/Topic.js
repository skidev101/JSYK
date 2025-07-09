const mongoose = require("mongoose");


const topicSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  profileSlug: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true,
    maxLength: 100
  },
  themeColor: {
    type: String,
    required: true
  },
  topicImgUrl: {
    type: String,
    default: null
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


module.exports = mongoose.model("Topic", topicSchema);
