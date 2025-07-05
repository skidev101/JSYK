const mongoose = require('mongoose');

const individualMessageSchema = new mongoose.Schema({
   content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500
   },
   isRead: {
      type: Boolean,
      default: false
   },
   senderHash: {
      type: String,
      required: true
   }
}, {
   timeStamps: true
});

const messageSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true,
      unique: true,
      index: true
   },
   messages: [individualMessageSchema],
   totalMessages: {
      type: Number,
      default: 0
   },
   unreadCount: {
      type: Number,
      default: 0
   }
}, {
   timeStamps: true
})

messageSchema.index({ uid: 1, 'messages.createdAt': -1 });
messageSchema.index({ uid: 1, 'messages.isRead': -1 });
