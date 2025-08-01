const config = require('../config');
const floodMap = new Map();

exports.antiFlood = async (sock, msg, isOwner, isBot) => {
  try {
    if (isOwner || isBot) return;
    const groupId = msg.key.remoteJid;
    const sender = msg.key.participant;
    const now = Date.now();

    if (!floodMap.has(groupId)) floodMap.set(groupId, {});
    const groupFlood = floodMap.get(groupId);
    if (!groupFlood[sender]) groupFlood[sender] = [];

    groupFlood[sender].push(now);

    // Remove timestamps older than interval
    groupFlood[sender] = groupFlood[sender].filter(
      ts => now - ts < config.antiFlood.interval * 1000
    );

    if (groupFlood[sender].length > config.antiFlood.limit) {
      await sock.groupParticipantsUpdate(groupId, [sender], 'remove');
      await sock.sendMessage(
        groupId,
        {
          text: `@${sender.split('@')[0]} removed for spamming`,
          mentions: [sender]
        }
      );
      groupFlood[sender] = [];
    }
  } catch (e) {
    require('../utils/logger').error('antiFlood error', e);
  }
};
