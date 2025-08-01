const { allGroupMembers } = require('../utils/helpers');
const { isCommandAllowed } = require('../middleware/permissions');

exports.name = 'tagall';

exports.run = async (sock, msg, args) => {
  if (!await isCommandAllowed(sock, msg, 'tagall')) return;
  const groupId = msg.key.remoteJid;
  const text = args.join(' ') || '';
  const mentions = await allGroupMembers(sock, groupId);
  await sock.sendMessage(
    groupId,
    { text: `${text}\n${mentions.map(jid => '@' + jid.split('@')[0]).join(' ')}`, mentions },
    { quoted: msg }
  );
};
