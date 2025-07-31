const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const commands = require('./commands');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
  // Ignore messages from groups and statuses
  if (message.from.endsWith('@g.us') || message.from.endsWith('@s.whatsapp.net')) {
    return;
  }

  // Check if the message starts with a command prefix
  if (message.body.startsWith('!')) {
    const [commandName, ...args] = message.body.slice(1).split(/ +/);

    // Check if the command exists
    if (commands[commandName]) {
      commands[commandName](message, args);
    } else {
      message.reply(`Command not found: ${commandName}`);
    }
  }
});

client.initialize();
