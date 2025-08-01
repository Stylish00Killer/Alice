const config = require('../config');

exports.name = 'open-all';

exports.run = async (sock, msg, args) => {
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.split('@')[0];
  if (!config.owners.includes(senderNum)) return;

  const groups = await sock.groupFetchAllParticipating();
  for (const id in groups) {
    try {
      if (groups[id].participants.find(p => p.id === sock.user.id && p.admin)) {
        await sock.groupSettingUpdate(id, 'not_announcement');
      }
    } catch {}
  }
  await sock.sendMessage(msg.key.remoteJid, { text: 'All groups opened.' }, { quoted: msg });
};
