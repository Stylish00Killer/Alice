const { isCommandAllowed } = require('../middleware/permissions');

exports.name = 'group';

exports.run = async (sock, msg, args) => {
  if (!await isCommandAllowed(sock, msg, 'group')) return;
  const groupId = msg.key.remoteJid;
  if (!['open', 'close'].includes(args[0])) return;
  await sock.groupSettingUpdate(groupId, args[0] === 'open' ? 'not_announcement' : 'announcement');
  await sock.sendMessage(groupId, { text: `Group is now ${args[0] === 'open' ? 'open' : 'closed'}` }, { quoted: msg });
};
