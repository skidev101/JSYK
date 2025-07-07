const { redisClient } = require('../config/redis');

const RATE_LIMIT = 5;
const TIME_WINDOW = 60;

const rateLimiter = async (req, res, next) => {
   try {
      const ip = req.ip || req.connection.remoteAddress
      const key = `rate-limit${ip}`

      const count = await redisClient.incr(key);
      if (count === 1) {
         await redisClient.expire(key, TIME_WINDOW);
      }

      if (count > RATE_LIMIT) {
         return res.status(429).json({
            success: false,
            message: 'Too many requests. Try again later'
         })
      }
      next();
   } catch (err) {
      console.error('Rate limiter error:', err);
      next(); // Allow requests if Redis fails (fail-safe)
   }
}

module.exports = rateLimiter;