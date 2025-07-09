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




const getMyMessages = async (req, res) => {
   try {
      const { page = 1, limit = 20 } = req.query;
      const { uid } = req.user

      const userMessages = await Message.findOne({ uid });
      if (!userMessages || userMessages.messages.length === 0) {
         return res.status(200).json({
            success: true,
            messages: [],
            unreadCount: 0,
            pagination: {
               page: parseInt(page),
               limit: parseInt(limit),
               total: 0,
               pages: 0
            }
         });
      } 

      const sortedMessages = userMessages.messages.sort((a, b) => 
         new Date(b.createdAt) - new Date(a.createdAt)
      );

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedMessages = sortedMessages.slice(startIndex, endIndex);

      res.status(200).json({
         success: true,
         messages: paginatedMessages,
         unreadCount: userMessages.unreadCount,
         pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: userMessages.totalMessages,
            pages: Math.ceil(userMessages.totalMessages / limit)
         }
      })

   } catch (err) {
      console.error("Error getting messages:", err)
      res.status(500).json({
         success: false,
         message: 'Server error'
      })
   }
}


const markAsRead = async (req, res) => {
   try {
      const { uid } = req.user;
      const { messageId } = req.params;

      const userMessages = await Message.findOne({ uid });
      if (!userMessages) {
         return res.status(404).json({
            success: false,
            message: 'User not found'
         });
      }

      const success = userMessages.markAsRead(messageId);

      if (!success) {
         return res.status(404).json({
            success: false,
            message: 'Message not found'
         });
      }

      res.status(200).json({
         success: true,
         message: 'Message marked as read',
         unreadCount: userMessages.unreadCount
      })
   } catch (err) {
      console.error('Error marking message as read:', err);
      res.status(500).json({
         success: false,
         message: 'Server error'
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
         message: 'Server error'
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
   getMyMessages,
   markAsRead,
   deleteMessage,
   getAllMessages
}