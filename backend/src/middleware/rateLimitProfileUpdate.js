import redisClient from "../config/redisClient.js";

export const rateLimitProfileUpdate = async (req, res, next) => {
  const { uid } = req.user;
  const key = `rate:profile:${uid}`;
  const windowSeconds = 60; // 1 minute
  const limit = 3;

  try {
    const count = await redisClient.incr(key);
    if (count === 1) {
      await redisClient.expire(key, windowSeconds);
    }

    if (count > limit) {
      return res.status(429).json({
        success: false,
        message: "Too many profile updates. Please wait a moment.",
        code: "TOO_MANY_REQUESTS",
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiting error:", err);
    return res.status(500).json({
      success: false,
      message: "Rate limiting failed.",
      code: "RATE_LIMIT_ERROR",
    });
  }
};

