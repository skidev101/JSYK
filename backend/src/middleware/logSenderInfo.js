import uaParser from "ua-parser-js";

const logSenderInfo = (req, res, next) => {
  const userAgent = req.get("User-Agent") || "";
  const ua = uaParser(userAgent);

  req.senderInfo = {
    device: ua.device.type || "desktop",
    browser: ua.browser.name || "unknown",
    os: ua.os.name || "unknown",
    userAgent,
  };
  next();
};

export default logSenderInfo;
