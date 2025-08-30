import * as uaParser from "ua-parser-js";

export const logSenderInfo = (req, res, next) => {
  const userAgent = req.get("User-Agent") || "";
  const ua = new uaParser.UAParser(userAgent);

  req.senderInfo = {
    device: ua.device.type || "desktop",
    browser: ua.browser.name || "unknown",
    os: ua.os.name || "unknown",
    userAgent,
  };
  next();
};

