require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const commands = require('./commands');

const client = new Client({
    authStrategy: new LocalAuth()
});

const prefixes = (process.env.PREFIX || '!').split(' ');
const ownerNumber = process.env.OWNER_NUMBER;

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

  const usedPrefix = prefixes.find(p => message.body.startsWith(p));
  if (!usedPrefix) {
    return;
  }

  const [commandName, ...args] = message.body.slice(usedPrefix.length).trim().split(/ +/);

  // Check if the command exists
  if (commands[commandName]) {
    commands[commandName](message, args, { ownerNumber });
  } else {
    message.reply(`Command not found: ${commandName}`);
  }
});

client.initialize();
