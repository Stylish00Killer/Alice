const { handle } = require('../commands/index');
const ping = require('../commands/ping');
const config = require('../config');

jest.mock('node-fetch');
jest.mock('../commands/ping', () => ({
  name: 'ping',
  run: jest.fn(),
}));

describe('command handler', () => {
  let sock;
  let msg;

  beforeEach(() => {
    sock = {
      sendMessage: jest.fn(),
    };
    msg = {
      key: {
        remoteJid: 'test@s.whatsapp.net',
      },
      message: {
        conversation: '',
      },
    };
    ping.run.mockClear();
  });

  it('should call the ping command', async () => {
    msg.message.conversation = `${config.prefix}ping`;
    await handle(sock, msg);
    expect(ping.run).toHaveBeenCalledWith(sock, msg, []);
  });

  it('should not call any command if prefix is missing', async () => {
    msg.message.conversation = 'ping';
    await handle(sock, msg);
    expect(ping.run).not.toHaveBeenCalled();
  });

  it('should not call any command if command does not exist', async () => {
    msg.message.conversation = `${config.prefix}nonexistent`;
    await handle(sock, msg);
    expect(ping.run).not.toHaveBeenCalled();
  });

  it('should call the command with arguments', async () => {
    msg.message.conversation = `${config.prefix}ping arg1 arg2`;
    await handle(sock, msg);
    expect(ping.run).toHaveBeenCalledWith(sock, msg, ['arg1', 'arg2']);
  });
});
