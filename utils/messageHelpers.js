const config = require('../config');

function getSender(msg) {
  return msg.key.participant || msg.key.remoteJid;
}

function isGroup(msg) {
  return msg.key.remoteJid.endsWith('@g.us');
}

function isOwner(msg) {
  const sender = getSender(msg);
  return config.owners.includes(sender.split('@')[0]);
}

function isBot(msg) {
  const sender = getSender(msg);
  return sender.startsWith(config.botNumber[0]);
}

module.exports = {
  getSender,
  isGroup,
  isOwner,
  isBot,
};
