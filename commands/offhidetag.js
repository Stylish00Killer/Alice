const { setMode } = require('../utils/hidetagMode');

module.exports = {
  name: 'offhidetag',
  permissions: ['owner'],
  run: async (sock, msg, args) => {
    setMode(false);
    await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode disabled globally' }, { quoted: msg });
  },
};
