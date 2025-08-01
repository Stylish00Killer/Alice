const fs = require('fs');
const path = require('path');
const AFK_FILE = path.join(__dirname, '..', 'afk.json');

function readAfk() {
  if (!fs.existsSync(AFK_FILE)) fs.writeFileSync(AFK_FILE, '{}');
  return JSON.parse(fs.readFileSync(AFK_FILE, 'utf8'));
}
function writeAfk(data) {
  fs.writeFileSync(AFK_FILE, JSON.stringify(data));
}

exports.name = 'afk';

exports.run = async (sock, msg, args) => {
  const sender = msg.key.participant || msg.key.remoteJid;
  const reason = args.join(' ') || 'AFK';
  const afkData = readAfk();
  afkData[sender] = { reason, start: Date.now() };
  writeAfk(afkData);
  await sock.sendMessage(msg.key.remoteJid, { text: `AFK set: ${reason}` }, { quoted: msg });
};

// To be called in the message event to handle AFK mentions and return-from-AFK message.
exports.checkAfk = async (sock, msg) => {
  const afkData = readAfk();
  // Handle if someone is mentioned
  if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
    for (const jid of msg.message.extendedTextMessage.contextInfo.mentionedJid) {
      if (afkData[jid]) {
        const since = Date.now() - afkData[jid].start;
        const mins = Math.floor(since / 60000);
        await sock.sendMessage(msg.key.remoteJid, {
          text: `User is AFK: ${afkData[jid].reason} (${mins} min ago)`
        }, { quoted: msg });
      }
    }
  }
  // Handle if AFK user returns
  const sender = msg.key.participant || msg.key.remoteJid;
  if (afkData[sender]) {
    delete afkData[sender];
    writeAfk(afkData);
    await sock.sendMessage(msg.key.remoteJid, { text: 'Welcome back, AFK removed!' }, { quoted: msg });
  }
};
