const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys')
const P = require('pino')
const config = require('./config')
const logger = require('./utils/logger')
const fs = require('fs')

const authDir = './auth'
if (!fs.existsSync(authDir)) fs.mkdirSync(authDir)

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(authDir)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'warn' }),
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
      if (connection === 'connecting') logger.info('Connecting...');
      if (qr) {
          // Show QR code in terminal as ASCII
          const qrcode = require('qrcode-terminal');
          qrcode.generate(qr, { small: true });
      }
      if (connection === 'close') {
          const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
          logger.error('Disconnected.', lastDisconnect?.error);
          if (shouldReconnect) startBot();
      }
      if (connection === 'open') logger.info('Connected!');
});

  // Event Routers
  require('./events/message')(sock)
  require('./events/group')(sock)
}

startBot()
