import dotenv from "dotenv";
const PORT = process.env.PORT;
import app from "./src/app.js";
import DBConnect from "./src/config/db.js";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  DBConnect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}

// For Vercel serverless
const handler = async (req, res) => {
  try {
    await DBConnect();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
};

module.exports = handler