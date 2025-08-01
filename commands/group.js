exports.name = 'group';
exports.permissions = ['group', 'admin'];

exports.run = async (sock, msg, args) => {
  const groupId = msg.key.remoteJid;
  if (!['open', 'close'].includes(args[0])) return;
  await sock.groupSettingUpdate(groupId, args[0] === 'open' ? 'not_announcement' : 'announcement');
  await sock.sendMessage(groupId, { text: `Group is now ${args[0] === 'open' ? 'open' : 'closed'}` }, { quoted: msg });
};
