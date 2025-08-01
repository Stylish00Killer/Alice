const { allGroupMembers } = require('../utils/helpers');

exports.name = 'tagall';
exports.permissions = ['group', 'admin'];

exports.run = async (sock, msg, args) => {
  const groupId = msg.key.remoteJid;
  const text = args.join(' ') || '';
  const mentions = await allGroupMembers(sock, groupId);
  await sock.sendMessage(
    groupId,
    { text: `${text}\n${mentions.map(jid => '@' + jid.split('@')[0]).join(' ')}`, mentions },
    { quoted: msg }
  );
};
