const mongoose = require('mongoose');
const User = require('../models/User');

const handleAuth = async () => {
   const { uid, username, email, profileImgUrl } = req.user;

   try {
      // Check if user already exists
      let user = await User.find ({ uid });
      if (!user) {   
         // Create a new user if not found
         user = await User.create({
            uid,
            username,
            email,
            profileImgUrl
         });
      }

      res.status(200).json({
         success: true,
         user: {
            uid: user.uid,
            username: user.username,
            email: user.email,
            profileImgUrl: user.profileImgUrl
         }
      });
   } catch (error) {
      console.error('Error handling authentication:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error'
      });
   }
}

module.exports = {
   handleAuth
}