require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const DBConnect = require('./src/config/db');

DBConnect().then(() => {
   console.log('Database connected successfully');
   app.listen(PORT, () => {
      console.log(`app is running on port ${PORT}`);
   });
}).catch((err) => {
   console.error('Database connection failed:', err);
});
app.get('/', (req, res) => {
   res.send('Hello, World!');
});