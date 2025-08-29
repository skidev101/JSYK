const app = require('../src/app');
const DBConnect = require('../src/config/db'); 

module.exports = async (req, res) => {
  try {
    await DBConnect(); // ensure DB connection
    return app(req, res);
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ AppError: "Internal Server Error" });
  }
};
// This is the entry point of the application. It imports the app from src/app.js and starts the server on the specified port.
// The server listens for incoming requests and logs a message to the console when it starts successfully.