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
  owner: (message, args, options) => {
    const authorNumber = message.from.replace(/@c.us$/, '');
    if (authorNumber === options.ownerNumber) {
      message.reply('Hello, owner!');
    } else {
      message.reply('You are not the owner of this bot.');
    }
  },
};
