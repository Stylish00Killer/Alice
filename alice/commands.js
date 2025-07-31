// commands.js
module.exports = {
  ping: (message) => {
    message.reply('pong');
  },
  echo: (message, args) => {
    if (!args.length) {
      return message.reply('You must provide a message to echo.');
    }
    message.reply(args.join(' '));
  },
};
