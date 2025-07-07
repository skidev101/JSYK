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
      profileSlug : {
         type: String,
         required: true,
         unique: true
      },
      profileViews: {
         type: Number,
         default: ''
      },
      lastProfileView: {
         type: Date,
         default: ''
      }
   }, {
      timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
