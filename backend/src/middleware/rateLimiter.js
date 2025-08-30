import { redis } from "../config/redis.js";
import crypto from "crypto";

const MAX_REQUESTS = 10;
const TIME_WINDOW = 60;
const IP_SALT = process.env.IP_SALT || "salty_salt";

export const limitSendMessage = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const hashedIP = crypto
      .createHash("sha256")
      .update(ip + IP_SALT)
      .digest("hex");
    const key = `rate:${hashedIP}`;
    req.ipHash = hashedIP;

    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, TIME_WINDOW);
    }

    if (count > MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Try again later",
        code: "TOO_MANY_REQUESTS",
      });
    }
    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    return res.status(429).json({
      success: false,
      message: "Rate limiter failed",
      code: "RATE_LIMIT_ERROR",
    });
  }
};

