const config = require('../config');
const { groupAdmins, isBotAdmin } = require('../utils/groupUtils');

const checkPermissions = async (sock, msg, command) => {
  const { permissions } = command;
  if (!permissions) {
    return true; // No permissions required
  }

  const groupId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.split('@')[0];

  const isOwner = config.owners.includes(senderNum);
  if (isOwner) {
    return true; // Owners have all permissions
  }

  const isBot = config.botNumber.includes(senderNum);
  if (isBot) {
    return true; // Bot has all permissions
  }

  if (permissions.includes('owner') && !isOwner) {
    return false; // Owner permission required
  }

  if (permissions.includes('group')) {
    const isGroup = msg.key.remoteJid.endsWith('@g.us');
    if (!isGroup) {
      return false; // Group command used outside of a group
    }

    const botIsAdmin = await isBotAdmin(sock, groupId);
    if (!botIsAdmin) {
      // await sock.sendMessage(groupId, { text: "I need to be an admin to do that." });
      return false;
    }

    if (permissions.includes('admin')) {
      const admins = await groupAdmins(sock, groupId);
      const isAdmin = admins.includes(sender);
      if (!isAdmin) {
        return false; // Admin permission required
      }
    }
  }

  return true;
};

module.exports = {
  checkPermissions,
};
