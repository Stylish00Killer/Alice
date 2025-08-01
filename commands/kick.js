exports.name = 'kick';
exports.permissions = ['group', 'admin'];

exports.run = async (sock, msg, args) => {
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
  if (mentions.length === 0) return;
  const groupId = msg.key.remoteJid;
  for (const target of mentions) {
    await sock.groupParticipantsUpdate(groupId, [target], 'remove');
    await sock.sendMessage(groupId, { text: `Successfully Removed`, mentions: [target] }, { quoted: msg });
  }
};
