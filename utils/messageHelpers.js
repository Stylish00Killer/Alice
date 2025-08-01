const config = require('../config');

function isGroup(msg) {
  return msg.key.remoteJid.endsWith('@g.us');
}

function isOwner(msg) {
  const sender = msg.key.participant || msg.key.remoteJid;
  return config.owners.includes(sender.split('@')[0]);
}

function isBot(msg) {
  const sender = msg.key.participant || msg.key.remoteJid;
  return sender.startsWith(config.botNumber[0]);
}

module.exports = {
  isGroup,
  isOwner,
  isBot,
};
