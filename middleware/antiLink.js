const config = require('../config');
const { groupAdmins, isBotAdmin } = require('../utils/groupUtils');

const LINK_REGEX = /(https?:\/\/|www\.|chat\.whatsapp\.com|channel\.whatsapp\.com)/i;

exports.antiLink = async (sock, msg, isOwner, isBot) => {
  try {
    const groupId = msg.key.remoteJid;
    const sender = msg.key.participant;
    if (isOwner || isBot) return; // Owners and bot immune
    if (!msg.message?.conversation) return;
    if (!LINK_REGEX.test(msg.message.conversation)) return;

    const botAdmin = await isBotAdmin(sock, groupId);
    if (!botAdmin) return; // Only if bot is admin

    const admins = await groupAdmins(sock, groupId);
    if (admins.includes(sender)) return; // Admins immune

    // Delete message & kick
    await sock.sendMessage(groupId, { delete: msg.key });
    await sock.groupParticipantsUpdate(groupId, [sender], 'remove');
    await sock.sendMessage(
      groupId,
      {
        text: `@${sender.split('@')[0]} removed for sending links`,
        mentions: [sender]
      }
    );
  } catch (e) {
    // Optional: logging
    require('../utils/logger').error('antiLink error', e);
  }
};
