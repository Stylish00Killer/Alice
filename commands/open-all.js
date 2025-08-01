exports.name = 'open-all';
exports.permissions = ['owner'];

exports.run = async (sock, msg, args) => {
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
