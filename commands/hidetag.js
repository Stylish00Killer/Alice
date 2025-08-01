const { allGroupMembers } = require('../utils/helpers');
const { getLinkPreview } = require('../utils/richPreview');
const { setMode } = require('../utils/hidetagMode');

exports.name = 'hidetag';
exports.permissions = ['group', 'admin'];

exports.run = async (sock, msg, args) => {
  const [subcommand, ...textArgs] = args;

  if (subcommand === 'on') {
    setMode(true);
    await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode enabled globally' }, { quoted: msg });
    return;
  }

  if (subcommand === 'off') {
    setMode(false);
    await sock.sendMessage(msg.key.remoteJid, { text: 'Hidetag mode disabled globally' }, { quoted: msg });
    return;
  }

  const groupId = msg.key.remoteJid;
  const text = args.join(' ') || '';
  const mentions = await allGroupMembers(sock, groupId);

  // If there's a link, add rich preview
  const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
  if (urlMatch) {
    const preview = await getLinkPreview(urlMatch[1]);
    await sock.sendMessage(
      groupId,
      {
        text: text,
        mentions,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: preview.title,
            body: preview.desc,
            thumbnailUrl: preview.thumb,
            sourceUrl: urlMatch[1]
          }
        }
      },
      { quoted: msg }
    );
  } else {
    await sock.sendMessage(
      groupId,
      { text, mentions },
      { quoted: msg }
    );
  }
};
