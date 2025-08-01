exports.name = 'close-all';
exports.permissions = ['owner'];

exports.run = async (sock, msg, args) => {
  const groups = await sock.groupFetchAllParticipating();
  for (const id in groups) {
    try {
      if (groups[id].participants.find(p => p.id === sock.user.id && p.admin)) {
        await sock.groupSettingUpdate(id, 'announcement');
      }
    } catch {}
  }
  await sock.sendMessage(msg.key.remoteJid, { text: 'All groups closed.' }, { quoted: msg });
};
