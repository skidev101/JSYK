const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   messages: {
      type: Array,
      default: []
   },
   createdAt: {
      type: Date,
      default: Date().now
   }
})