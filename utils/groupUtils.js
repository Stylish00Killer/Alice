const config = require('../config');
const logger = require('./logger');

// Get all admin JIDs in a group
exports.groupAdmins = async (sock, groupId) => {
  try {
    const metadata = await sock.groupMetadata(groupId);
    return metadata.participants
      .filter(p => p.admin)
      .map(p => p.id);
  } catch (e) {
    logger.error('groupAdmins error', e);
    return [];
  }
};

// Check if bot is admin in a group
exports.isBotAdmin = async (sock, groupId) => {
  try {
    const metadata = await sock.groupMetadata(groupId);
    const botNumber = sock.user.id || sock.user.jid;
    const bot = metadata.participants.find(p => p.id === botNumber);
    return !!(bot && bot.admin);
  } catch (e) {
    logger.error('isBotAdmin error', e);
    return false;
  }
};

// Check if participant is group admin
exports.isAdmin = async (sock, groupId, jid) => {
  const admins = await exports.groupAdmins(sock, groupId);
  return admins.includes(jid);
};

// Get all group members
exports.allGroupMembers = async (sock, groupId) => {
  try {
    const metadata = await sock.groupMetadata(groupId);
    return metadata.participants.map(p => p.id);
  } catch (e) {
    logger.error('allGroupMembers error', e);
    return [];
  }
};

// Get group metadata
exports.groupMetadata = async (sock, groupId) => {
  try {
    return await sock.groupMetadata(groupId);
  } catch (e) {
    logger.error('groupMetadata error', e);
    return null;
  }
};

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
