const { toggleAllGroups } = require('../utils/group');

exports.name = 'close-all';
exports.permissions = ['owner'];

exports.run = async (sock, msg, args) => {
  await toggleAllGroups(sock, 'announcement');
  await sock.sendMessage(msg.key.remoteJid, { text: 'All groups closed.' }, { quoted: msg });
};
