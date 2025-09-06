const allowedOrigins = process.env.CLIENT_URL?.split(",").map((origin) =>
  origin.trim()
);

const corsConfig = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.includes("ngrok-free.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsConfig;
