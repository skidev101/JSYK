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
      jsykLink : {
         type: String,
         required: true,
         unique: true
      }
   }, {
      timestamps: true
});


userSchema.index({ uid: 1 });
userSchema.index({ useername: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
