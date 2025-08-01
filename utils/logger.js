const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../logs/bot.log');

exports.info = (msg) => {
  console.log('[INFO]', msg);
  fs.appendFileSync(logFile, `[INFO] ${new Date().toISOString()} ${msg}\n`);
};
exports.error = (msg, err = '') => {
  console.error('[ERROR]', msg, err);
  fs.appendFileSync(logFile, `[ERROR] ${new Date().toISOString()} ${msg} ${err}\n`);
};
exports.warn = (msg) => {
  console.warn('[WARN]', msg);
  fs.appendFileSync(logFile, `[WARN] ${new Date().toISOString()} ${msg}\n`);
};
