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
   timestamps: true
});

const messageSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true,
      unique: true
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
   timestamps: true
})

messageSchema.methods.addMessage = function(messageData) {
  this.messages.push(messageData);
  this.totalMessages = this.messages.length;
  this.unreadCount = this.messages.filter(msg => !msg.isRead).length;
  return this.save();
};

messageSchema.methods.markAsRead = function(messageId) {
  const message = this.messages.id(messageId);
  if (message && !message.isRead) {
    message.isRead = true;
    this.unreadCount = this.messages.filter(msg => !msg.isRead).length;
    return this.save();
  }
  return false;
};

messageSchema.methods.deleteMessage = function(messageId) {
  this.messages.pull(messageId);
  this.totalMessages = this.messages.length;
  this.unreadCount = this.messages.filter(msg => !msg.isRead).length;
  return this.save();
};


messageSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.totalMessages = this.messages.length;
    this.unreadCount = this.messages.filter(msg => !msg.isRead).length;
  }
  next();
});

messageSchema.index({ uid: 1, 'messages.createdAt': -1 });
messageSchema.index({ uid: 1, 'messages.isRead': -1 });

module.exports = mongoose.model('Message', messageSchema);