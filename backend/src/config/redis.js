const { createClient } = require('redis');

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT) || 6379
  }
});

redis.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

let isConnected = false;

(async () => {
  try {
    if (!isConnected) {
      await redis.connect();
      isConnected = true;
      console.log('✅ Redis connected');
    }
  } catch (err) {
    console.error('❌ Redis connect failed:', err);
  }
})();

module.exports = {redis};
