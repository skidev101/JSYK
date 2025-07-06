const redis = require('redis')

const redisClient = redis.createClient({
   socket: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379
   },
   password: process.env.REDIS_PASSWORD || undefined
});

redisClient.on('error', (err) => console.error('Redis error', err));
redisClient.on('connect', () => console.error('Redis connected'));

async function connectRedis() {
   if (!redisClient.isOpen) await redisClient.connect();
}

module.exports = {
   redisClient,
   connectRedis
}