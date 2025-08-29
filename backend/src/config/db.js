const mongoose = require('mongoose');

const DBConnect = async () => {
   let isConnected;
   try {
      if (isConnected) return;
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log('MongoDB connected successfully');
   } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit the process with failure
   }
}

module.exports = DBConnect;