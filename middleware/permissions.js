// middleware/permissions.js
const config = require('../config');
const { groupAdmins, isBotAdmin } = require('../utils/helpers');

exports.isCommandAllowed = async (sock, msg, command) => {
  const groupId = msg.key.remoteJid;
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderNum = sender.split('@')[0];

  // Owners and bot always allowed
  if (config.owners.includes(senderNum) || config.botNumber.includes(senderNum)) return true;

  // .onhidetag and .offhidetag only for owners/bot
  if (['onhidetag', 'offhidetag'].includes(command))
    return config.owners.includes(senderNum) || config.botNumber.includes(senderNum);

  // Group admin check
  const admins = await groupAdmins(sock, groupId);
  const isAdmin = admins.includes(sender);
  const botIsAdmin = await isBotAdmin(sock, groupId);

  if (!botIsAdmin) return false; // group admins can't use commands if bot is not admin
  return isAdmin;
};
