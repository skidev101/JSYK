import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

(async () => {
  try {
    const ping = await redis.ping();
    console.log("Redis ping:", ping);
  } catch (err) {
    console.error("Redis connection error:", err);
  }
})();
