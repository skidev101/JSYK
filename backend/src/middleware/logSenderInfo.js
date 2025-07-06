const uaParser = require('ua-parser-js');

const logSenderInfo = (req, res, next) => {
   const userAgent = req.get('User-Agent');
   const ua = uaParser(userAgent);

   req.senderInfo = {
      ip: req.ip || req.connection.remoteAddress,
      device: ua.device.type || 'desktop',
      browser: ua.brwser.name,
      os: ua.os.name,
      userAgent
   };

   next();
}

module.exports = logSenderInfo