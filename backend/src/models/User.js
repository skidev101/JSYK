const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   uid: {
      type: String,
      required: true,
      unique: true
   },
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   profileImgUrl: {
      type: String,
      required: true
   },
   jsykLink : {
      type: String,
      default: ''
   }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
