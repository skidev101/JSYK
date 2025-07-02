const User = require('../models/User');

const checkUsername = async (req, res) => {
    const username = req.query.username?.trim();

    console.log(req.query)

    if (!username) return res.status(400).json({ 
      success: false,
      available: false, 
      message: 'username is required' 
    });
       
    if (username.length < 3 || username.length > 10) {
        return res.status(400).json({ 
         success: false, 
         available: false,
         message: 'username must be between 3 and 10 characters long' 
         
      });
   }

   const user = await User.findOne({ username });
   res.status(200).json({ 
      success: true,
      available: !user, 
      message: !user ? 'username is available' : 'username is already taken' 
   }); 
}

module.exports = { checkUsername }