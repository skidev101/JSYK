import mongoose from "mongoose";

let isConnected;
const DBConnect = async () => {
   try {
      if (isConnected) return;
      const connected = await mongoose.connect(process.env.MONGO_URI);
      isConnected = connected.connections[0].readyState === 1;
      console.log('MongoDB connected successfully');
   } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err
   }
}

module.exports = DBConnect;