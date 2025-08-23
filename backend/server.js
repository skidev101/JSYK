require('dotenv').config();
const PORT = process.env.PORT;
const app = require('./src/app');
const DBConnect = require('./src/config/db');

DBConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
// This is the entry point of the application. It imports the app from src/app.js and starts the server on the specified port.
// The server listens for incoming requests and logs a message to the console when it starts successfully.