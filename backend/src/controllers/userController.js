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
         message: 'Username must be between 3 and 10 characters long' 
      
      });
   }

   const user = await User.findOne({ username });
   res.status(200).json({ 
      available: !user, 
      message: !user ? 'Username is available' : 'Username is already taken' 
   }); 
}

module.exports = { checkUsername }