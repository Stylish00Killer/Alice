const fs = require('fs');
const path = require('path');

const cmds = {};

// Dynamically load all command modules
fs.readdirSync(__dirname).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const cmd = require(path.join(__dirname, file));
    cmds[cmd.name] = cmd;
  }
});

exports.handle = async (sock, msg) => {
  try {
    const body = msg.message.conversation;
    const [rawCmd, ...args] = body.trim().split(' ');
    const cmdName = rawCmd.slice(1).toLowerCase();
    const cmd = cmds[cmdName];
    if (!cmd) return;
    await cmd.run(sock, msg, args);
  } catch (e) {
    require('../utils/logger').error('Command handler error', e);
  }
};
