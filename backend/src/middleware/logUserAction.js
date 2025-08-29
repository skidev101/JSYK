import fs from 'fs';
import path from 'path';

const logUserAction = (action) => (req, res, next) => {
  const { uid } = req.user;
  const log = `[${new Date().toISOString()}] UID: ${uid} | ACTION: ${action} | IP: ${req.ip}\n`;

  const logPath = path.join(__dirname, '../logs/user_actions.log');
  fs.appendFile(logPath, log, (err) => {
    if (err) console.error("Error logging user action:", err);
  });

  next();
};

module.exports = logUserAction;
