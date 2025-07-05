const Message = require('../models/Message');




const sendMessage = async (req, res) => {
   
}





























const getAllMessages = async (req, res) => {
   const { uid } = req.user;

   try {
      const user = await Message.findOne({ uid });
      if (!user) {
         return res.status(200).json({
            success: true,
            messages: [],
            message: "no messages yet"
         })
      }

      res.status(200).json({
         success: true,
         messages: [...user.messages]
      })

   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         code: "SERVER_ERROR"
      })
   }
}

module.exports = {
   getAllMessages
}