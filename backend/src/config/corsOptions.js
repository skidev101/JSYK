const allowedOrigins = process.env.CLIENT_URL?.split(",").map(origin => origin.trim());

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you're using cookies or sessions
};

module.exports = corsOptions;