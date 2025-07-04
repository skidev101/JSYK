const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   profileImgUrl: {
      type: String,
      default: ''
   },
   profileLink : {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
