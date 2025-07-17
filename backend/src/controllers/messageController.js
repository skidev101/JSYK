const Message = require("../models/Message");
const User = require("../models/User");
const Topic = require("../models/Topic");

const sendMessage = async (req, res) => {
  try {
    const { topicId = null, content, profileSlug } = req.body;
    console.log(profileSlug)
    const user = await User.findOne({ profileSlug });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      }); 
    }

    let topicData = null;

    if (topicId) {
      topicData = await Topic.findOne({ topicId, uid: user.uid });
      if (!topicData) {
        return res.status(404).json({
          success: false,
          message: "Topic not found",
          code: "TOPIC_NOT_FOUND"
        });
      }
    }

    const newMessage = await Message.create({
      uid: user.uid,
      profileSlug,
      topic: topicData?.topic || null,
      topicSlug: topicData?.slug || null,
      topicId: topicData?.topicId || null,
      content,
      senderInfo: {
        ipHash: req.ipHash,
        ...req.senderInfo,
      },
    });

    console.log("new message created successfully:", newMessage);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("send message error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { uid } = req.user;
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);

    const skip = (page - 1) * limit;

    const topic = req.query.topic || null;
    const filter = { uid };
    if (topic) filter.topic = topic;

    const [messages, totalCount, unreadCount] = await Promise.all([
      Message.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-senderInfo"),
      Message.countDocuments(filter),
      Message.countDocuments({ ...filter, isRead: false }),
    ]);
    if (!messages || messages.length === 0) {
      return res.status(200).json({
        success: true,
        messages: [],
        unreadCount: 0,
        pagination: {
          page,
          limit,
          total: 0,
          pages: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      messages: messages,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      unreadCount,
    });
  } catch (err) {
    console.error("Error getting messages:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { uid } = req.user;
    const { messageId } = req.params;

    const message = await Message.findOne({ uid, _id: messageId });
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message does not exist",
        code: "MESSAGE_NOT_FOUND",
      });
    }

    if (!message.isRead) {
      message.isRead = true;
      await message.save();
      console.log("Message marked as read");
    }

    res.status(200).json({
      success: true,
      data: {
        topic: message.topic,
        topicSlug: message.topicSlug,
        content: message.content,
        createdAt: message.createdAt,
        isRead: message.isRead
      },
    });
  } catch (err) {
    console.error("Error getting messages:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { uid } = req.user;
    const { messageId } = req.query;

    const message = await Message.findOne({ uid, _id: messageId });
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
        code: "MESSAGE_NOT_FOUND",
      });
    }

    if (message.isRead) {
      return res.status(200).json({
        success: true,
        message: "Messsage already marked as read",
      });
    }

    message.isRead = true;
    console.log("Message marked as read");
    await message.save();

    const unreadCount = await Message.countDocuments({ uid, isRead: false });

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      unreadCount,
    });
  } catch (err) {
    console.error("Error marking message as read:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { uid } = req.user;
    const { messageId } = req.query;

    const message = await Message.findOneAndDelete({ uid, _id: messageId });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const unreadCount = await Message.countDocuments({ uid, isRead: false });
    const totalMessages = await Message.countDocuments({ uid });

    res.status(200).json({
      success: true,
      message: "Message deleted",
      unreadCount,
      totalMessages,
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

module.exports = {
  sendMessage,
  getUserMessages,
  getMessage,
  markAsRead,
  deleteMessage,
};
