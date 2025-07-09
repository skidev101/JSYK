const Message = require('../models/Message');
const User = require('../models/User');
const { hashSender } = require('../utils/ipHash');


const sendMessage = async (req, res) => {
   try {
      const { topic, content, profileSlug } = req.body;
      const user = await User.findOne({ profileSlug });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      // const senderHash = hashSender(req.ip, req.get('User-Agent'));

      const newMessage = await Message.create({
         uid,
         profileSlug,
         topic: topic || null,
         content,
         senderInfo: req.senderInfo
      });
      
      console.log("new message created successfully:", newMessage)

      res.status(201).json({
         success: true,
         message: "Message sent successfully"
      })

   } catch (err) {
      console.error('send message error:', err)
      res.status(500).json({
         success: false,
         message: "Internal Server error",
         code: "INTERNAL_SERVER_ERROR"
      })
   }
}




const getUserMessages = async (req, res) => {
   try {
      const { uid } = req.user;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const skip = (page - 1) * limit;

      const topic = req.query.topic || null;
      const filter = { uid };
      if (topic) filter.topic = topic;

      const [messages, totalCount, unreadCount] = await Promise.all([
         Message.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
         Message.countDocuments(filter),
         Message.countDocuments({ ...filter, isRead: false})  
      ])
      if (!messages || messages.length === 0) {
         return res.status(200).json({
            success: true,
            messages: [],
            unreadCount: 0,
            pagination: {
               page,
               limit,
               total: 0,
               pages: 0
            }
         });
      } 

      res.status(200).json({
         success: true,
         messages,
         pagination: {
            page,
            limit,
            total: totalCount,
            pages: Math.ceil(totalCount / limit)
         },
         unreadCount
      })

   } catch (err) {
      console.error("Error getting messages:", err)
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         code: "INTERNAL_SERVER_ERROR"
      })
   }
}


const markAsRead = async (req, res) => {
   try {
      const { uid } = req.user;
      const { messageId } = req.params;

      const message = await Message.find({ uid, _id: messageId });
      if (!message) {
         return res.status(404).json({
            success: false,
            message: 'Message not found',
            code: 'MESSAGE_NOT_FOUND'
         });
      }

      if (message.isRead) {
         return res.status(200).json({
            success: true,
            message: 'Messsage already marked as read'
         })
      }

      message.isRead = true;
      console.log('Message marked as read')
      await message.save();

      const unreadCount = await Message.countDocuments({ uid, isRead: false });

      res.status(200).json({
         success: true,
         message: 'Message marked as read',
         unreadCount
      })
   } catch (err) {
      console.error('Error marking message as read:', err);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         code: "INTERNAL_SERVER_ERROR"
      })
   }
}


const deleteMessage = async (req, res) => {
   try{
      const { uid } = req.user;
      const { messageId } = req.params;

      const userMessages = await Message.findOne({ uid });

      if (!userMessages) {
         return res.status(404).json({
            success: false,
            message: 'User not found'
         });
      }
      
      await userMessages. deleteMessage(messageId);
      res.status(200).json({
         success: true,
         message: 'Message deleted',
         totalMessages: userMessages.totalMessages
      });
   } catch (err) {
      console.error('Error deleting message:', err);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         code: "INTERNAL_SERVER_ERROR"
      });
   }

   
}


const getAllMessages = async (req, res) => {
   const { uid } = req.user;

   try {
      const user = await Message.findOne({ uid });
      if (!user) {
         return res.status(200).json({
            success: true,
            messages: [],
            message: "no messages yet"
         })
      }

      res.status(200).json({
         success: true,
         messages: [...user.messages]
      })

   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Internal server error"
      })
   }
}

module.exports = {
   sendMessage,
   getUserMessages,
   markAsRead,
   deleteMessage,
   getAllMessages
}