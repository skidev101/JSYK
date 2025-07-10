const User = require('../models/User');
const Topic = require('../models/Topic');
const Message = require('../models/Message');
const slugify = require('slugify');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);


const createTopic = async (req, res) => {
   try {
      // const { uid } = req.user;
      const { uid, topic, themeColor, topicImgUrl } = req.body;
      const user = await User.findOne({ uid });
      if (!user) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            code: 'USER_NOT_FOUND'
         })
      }

      const rawSlug = slugify(topic, { lowercase: true, strict: true });
      const truncatedSlug = rawSlug.substring(0, 50);
      const topicId = nanoid();

      const newTopic = await Topic.create({
         uid,
         profileSlug: user.profileSlug,
         topic,
         slug: truncatedSlug,
         topicId,
         themeColor: themeColor || null,
         topicImgUrl: topicImgUrl || null
      })

      const clientLink = `${user.profileSlug}/${truncatedSlug}-${topicId}`.toLowerCase();

      res.status(201).json({
         success: true,
         message: 'Topic created successfully',
         link: clientLink
      })

   } catch (err) {
      console.error('Error creating topic:', err);
      res.status(500).json({
         success: false,
         message: "Internal Server error",
         code: "INTERNAL_SERVER_ERROR"
      });
   }
}


const getUserTopics = async (req, res) => {
   try {
      const { uid } = req.body;

      const topics = await Topic.find({ uid });

      res.status(200).json({
         success: true,
         topics,
         topicsCount: topics.length,
         message: topics.length ? undefined : 'No topics yet'
      })

   } catch (err) {
      console.error('Error fetchiing topics:', err);
      res.status(500).json({
         success: false,
         message: "Internal Server error",
         code: "INTERNAL_SERVER_ERROR"
      });
   }
}


const deleteTopic = async (req, res) => {
   try {
      // const { uid } = req.user;
      const { uid, topicId } = req.query;


      const deletedTopic = await Topic.findOneAndDelete({ uid, topicId });
      if (!deletedTopic) {
         return res.status(404).json({
            success: false,
            message: 'Topic not found',
            code: 'TOPIC_NOT_FOUND'
         });
      }
      
      await Message.deleteMany({ uid, topicId });

      res.status(200).json({
         success: true,
         message: 'Topic and related messages deleted successfully',
      })

   } catch (err) {
      console.error('Error creating topic:', err);
      res.status(500).json({
         success: false,
         message: "Internal Server error",
         code: "INTERNAL_SERVER_ERROR"
      });
   }
}




module.exports = {
   createTopic,
   getUserTopics,
   deleteTopic
}