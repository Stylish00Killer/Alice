const { setMode } = require('../utils/hidetagMode');

module.exports = {
  name: 'onhidetag',
  permissions: ['owner'],
  run: async (sock, msg, args) => {
    setMode(true);
    await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode enabled globally' }, { quoted: msg });
  },
};
