const { isCommandAllowed } = require('../middleware/permissions');

exports.name = 'grouplink';

exports.run = async (sock, msg, args) => {
  if (!await isCommandAllowed(sock, msg, 'grouplink')) {
    await sock.sendMessage(msg.key.remoteJid, { text: 'You must be an admin.' }, { quoted: msg });
    return;
  }
  try {
    const code = await sock.groupInviteCode(msg.key.remoteJid);
    await sock.sendMessage(msg.key.remoteJid, { text: `https://chat.whatsapp.com/${code}` }, { quoted: msg });
  } catch {
    await sock.sendMessage(msg.key.remoteJid, { text: 'Unable to fetch group link.' }, { quoted: msg });
  }
};
