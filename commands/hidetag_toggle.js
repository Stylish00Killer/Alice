// commands/hidetag_toggle.js
const { isCommandAllowed } = require('../middleware/permissions');
const fs = require('fs');
const path = require('path');

const HIDETAG_FILE = path.join(__dirname, '..', 'hidetag_mode.json');

function getMode() {
  if (!fs.existsSync(HIDETAG_FILE)) return false;
  return JSON.parse(fs.readFileSync(HIDETAG_FILE, 'utf8')).enabled;
}

function setMode(value) {
  fs.writeFileSync(HIDETAG_FILE, JSON.stringify({ enabled: value }), 'utf8');
}

exports.name = 'onhidetag';
exports.run = async (sock, msg, args) => {
  if (!await isCommandAllowed(sock, msg, 'onhidetag')) return;
  setMode(true);
  await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode enabled globally' }, { quoted: msg });
};

exports.name2 = 'offhidetag';
exports.run2 = async (sock, msg, args) => {
  if (!await isCommandAllowed(sock, msg, 'offhidetag')) return;
  setMode(false);
  await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode disabled globally' }, { quoted: msg });
};

exports.getMode = getMode;
