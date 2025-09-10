import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";

export const getAdminAnalytics = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      newUsersToday,
      totalTopics,
      newTopicsToday,
      totalMessages,
      newMessagesToday,
      unreadMessages,
      topTopics,
      usersPerDay,
      messagesPerDay,
      cloudinaryUsage,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: today } }),

      Topic.countDocuments(),
      Topic.countDocuments({ createdAt: { $gte: today } }),

      Message.countDocuments(),
      Message.countDocuments({ createdAt: { $gte: today } }),
      Message.countDocuments({ isRead: false }),

      Topic.find().sort({ messageCount: -1 }).limit(5).select("topic messageCount"),

      User.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      Message.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      cloudinary.api.usage(), // 🔥 this replaces ImageKit’s usage API
    ]);

    res.status(200).json({
      users: {
        total: totalUsers,
        today: newUsersToday,
        perDay: usersPerDay,
      },
      topics: {
        total: totalTopics,
        today: newTopicsToday,
        top: topTopics,
      },
      messages: {
        total: totalMessages,
        today: newMessagesToday,
        unread: unreadMessages,
        perDay: messagesPerDay,
      },
      cloudinary: {
        storage: cloudinaryUsage.storage.usage,
        storageLimit: cloudinaryUsage.storage.limit,
        bandwidth: cloudinaryUsage.bandwidth.usage,
        bandwidthLimit: cloudinaryUsage.bandwidth.limit,
        requests: cloudinaryUsage.requests,
        transformations: cloudinaryUsage.transformations,
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
