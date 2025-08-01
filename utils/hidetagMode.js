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

module.exports = {
  getMode,
  setMode,
};
