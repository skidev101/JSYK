import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true
   },
   profileSlug: {
      type: String,
      required: true
   },
   topicId: {
      type: String,
      default: null
   },
   topicSlug: {
      type: String,
      default: null
   },
   topic: {
      type: String,
      default: null
   },
   content: {
      type: String,
      required: true
   },
   isRead: {
      type: Boolean,
      default: false
   },
   themeColor: {
      type: String,
      required: true
   },
   senderInfo: {
      ipHash: {
         type: String,
         required: true
      },
      userAgent: {
         type: String
      },
      browser: {
         type: String
      },
      os: {
         type: String
      },
      device: {
         type: String
      }
   }
}, {
   timestamps: true
})


messageSchema.index({ uid: 1, createdAt: -1 })
messageSchema.index({ profileSlug: 1, isRead: 1 })

module.exports = mongoose.model('Message', messageSchema);