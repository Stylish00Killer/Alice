exports.toggleAllGroups = async (sock, setting) => {
  const groups = await sock.groupFetchAllParticipating();
  for (const id in groups) {
    try {
      if (groups[id].participants.find(p => p.id === sock.user.id && p.admin)) {
        await sock.groupSettingUpdate(id, setting);
      }
    } catch {}
  }
};
