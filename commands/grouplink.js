exports.name = 'grouplink';
exports.permissions = ['group', 'admin'];

exports.run = async (sock, msg, args) => {
  try {
    const code = await sock.groupInviteCode(msg.key.remoteJid);
    await sock.sendMessage(msg.key.remoteJid, { text: `https://chat.whatsapp.com/${code}` }, { quoted: msg });
  } catch {
    await sock.sendMessage(msg.key.remoteJid, { text: 'Unable to fetch group link.' }, { quoted: msg });
  }
};
