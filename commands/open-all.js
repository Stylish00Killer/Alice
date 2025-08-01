const { toggleAllGroups } = require('../utils/group');

exports.name = 'open-all';
exports.permissions = ['owner'];

exports.run = async (sock, msg, args) => {
  await toggleAllGroups(sock, 'not_announcement');
  await sock.sendMessage(msg.key.remoteJid, { text: 'All groups opened.' }, { quoted: msg });
};
