import { Redis } from "@upstash/redis";

const isProduction = process.env.NODE_ENV === "production";

const redis = new Redis(
  isProduction
    ? {
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      }
    : {
        url: "http://localhost:6379",
        token: "dev-token",
      }
);

(async () => {
  try {
    const ping = await redis.ping();
    console.log("Redis ping:", ping);
  } catch (err) {
    console.error("Redis connection error:", err);
  }
})();

module.exports = {redis};