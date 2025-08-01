const config = require('../config');
const { antiLink } = require('../middleware/antiLink');
const { antiFlood } = require('../middleware/antiFlood');
const commands = require('../commands');
const logger =require('../utils/logger');
const { isGroup, isOwner, isBot } = require('../utils/messageHelpers');
const { checkAfk } = require('../commands/afk');

async function handleMiddleware(sock, msg) {
  if (isGroup(msg)) {
    await antiLink(sock, msg, isOwner(msg), isBot(msg));
    await antiFlood(sock, msg, isOwner(msg), isBot(msg));
  }
}

function handleCommands(sock, msg) {
  if (msg.message.conversation?.startsWith(config.prefix)) {
    commands.handle(sock, msg);
  }
}

async function processMessage(sock, msg) {
  if (!msg.message) return;

  try {
    await checkAfk(sock, msg);
    await handleMiddleware(sock, msg);
    handleCommands(sock, msg);
  } catch (err) {
    logger.error('Error in message event', err);
  }
}

module.exports = (sock) => {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    for (const msg of messages) {
      await processMessage(sock, msg);
    }
  });
};
