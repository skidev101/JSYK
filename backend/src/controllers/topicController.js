import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Message from "../models/Message.js";
import slugify from "slugify";
import { customAlphabet } from "nanoid";
import imageKit from "../config/imageKit.js";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);

export const createTopic = async (req, res) => {
  try {
    const { uid } = req.user;
    const { topic, themeColor } = req.body;
    const imgUrls = req.body.topicImgUrls || [];
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    const rawSlug = slugify(topic, { lowercase: true, strict: true });
    const truncatedSlug = rawSlug.substring(0, 50);
    const topicId = nanoid();
    const topicLink =
      `${user.profileSlug}/${truncatedSlug}-${topicId}`.toLowerCase();

    let topicImgUrlsWithExpiry = undefined;
    if (imgUrls) {
      console.log("topicImgUrls received:", imgUrls);
      const now = new Date();
      const expiryDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days
      topicImgUrlsWithExpiry = imgUrls.map((img) => ({
        url: img.url,
        publicId: img.publicId,
        expiresAt: expiryDate,
      }));
    }

    const newTopic = await Topic.create({
      uid,
      profileSlug: user.profileSlug,
      topic,
      slug: truncatedSlug,
      topicId,
      topicLink,
      themeColor: themeColor || null,
      topicImgUrls: topicImgUrlsWithExpiry,
    });

    console.log("new topic created:", newTopic);

    res.status(201).json({
      success: true,
      topicId: topicId,
      topic: topic,
      link: topicLink,
      message: "Topic created successfully",
    });
  } catch (err) {
    console.error("Error creating topic:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getUserTopics = async (req, res) => {
  try {
    const { uid } = req.user;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    const skip = (page - 1) * limit;

    const [topics, totalCount] = await Promise.all([
      Topic.find({ uid }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Topic.countDocuments({ uid }),
    ]);

    if (!topics || totalCount === 0) {
      return res.status(200).json({
        success: true,
        topics: [],
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0,
        },
        totalCount: 0,
      });
    }

    res.status(200).json({
      success: true,
      topics: topics,
      topicsCount: totalCount,
      message: topics.length ? undefined : "No topics yet",
    });
  } catch (err) {
    console.error("Error fetching topics:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getTopic = async (req, res) => {
  try {
    const { uid } = req.user;
    const { topicId } = req.params;
    const topic = await Topic.findOne({ uid, topicId });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
        code: "TOPIC_NOT_FOUND",
      });
    }
    const messageCount = await Message.countDocuments({ uid, topicId });
    console.log("now getting a topic");
    console.log(`total messages count for topic ${topicId}:`, messageCount);

    res.status(200).json({
      success: true,
      data: {
        topic: topic.topic,
        topicLink: topic.topicLink,
        themeColor: topic.themeColor,
        topicImgUrls: topic.topicImgUrls,
        createdAt: topic.createdAt,
        messageCount: messageCount,
      },
    });
  } catch (err) {
    console.error("Error fetching topic:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getTopicInfo = async (req, res) => {
  try {
    const { profileSlug, topicId } = req.params;
    const topic = await Topic.findOne({ profileSlug, topicId });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
        code: "INVALID_TOPIC",
      });
    }

    const user = await User.findOne({ profileSlug });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        profileImgUrl: user.profileImgUrl,
        topic: topic.topic,
        topicId: topic.topicId,
        themeColor: topic.themeColor,
        topicImgUrls: topic.topicImgUrls,
      },
    });
  } catch (err) {
    console.error("Error fetching topic:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { uid } = req.user;
    const { topicId } = req.params;

    const deletedTopic = await Topic.findOneAndDelete({ uid, topicId });
    if (!deletedTopic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
        code: "TOPIC_NOT_FOUND",
      });
    }

    if (deletedTopic.topicImgUrls?.length) {
      for (const img of deletedTopic.topicImgUrls) {
        try {
          imageKit.deleteFile(img.publicId);
        } catch (err) {
          console.error("Failed to delete image:", img.url, err.message);
        }
      }
    }

    await Message.deleteMany({ uid, topicId });

    res.status(200).json({
      success: true,
      message: "Topic and related messages deleted successfully",
    });
  } catch (err) {
    console.error("Error creating topic:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
