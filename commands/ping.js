exports.name = 'ping';

exports.run = async (sock, msg, args) => {
  await sock.sendMessage(msg.key.remoteJid, { text: 'pong!' }, { quoted: msg });
};
