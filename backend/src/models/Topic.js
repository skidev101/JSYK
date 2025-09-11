import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
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
      maxLength: 100,
    },
    slug: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    topicLink: {
      type: String,
      required: true,
    },
    themeColor: {
      type: String,
      default: null,
    },
    topicImgUrls: {
      type: [
        {
          url: String,
          publicId: String,
          expiresAt: Date,
        },
      ],
      default: undefined,
    },
    hadImages: {
      type: Boolean,
      default: false
    },
    messageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.index({ profileSlug: 1, topicId: 1 });

export default mongoose.model("Topic", topicSchema);
