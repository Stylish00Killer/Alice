const config = require('../config')
const { antiLink } = require('../middleware/antiLink')
const { antiFlood } = require('../middleware/antiFlood')
const commands = require('../commands')
const logger = require('../utils/logger')

module.exports = (sock) => {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    for (const msg of messages) {
      if (!msg.message) continue
      try {
        // Ignore status, broadcast, self
        const isGroup = !!msg.key.remoteJid.endsWith('@g.us')
        const isOwner = config.owners.includes(msg.key.participant?.split('@')[0])
        const isBot = msg.key.participant?.startsWith(config.botNumber[0])
        // Middleware: Anti-Link & Anti-Flood (groups only)
        if (isGroup) {
          await antiLink(sock, msg, isOwner, isBot)
          await antiFlood(sock, msg, isOwner, isBot)
        }
        // Command Handling
        if (msg.message.conversation?.startsWith(config.prefix)) {
          await commands.handle(sock, msg)
        }
      } catch (err) {
        logger.error('Error in message event', err)
      }
    }
  })
}
