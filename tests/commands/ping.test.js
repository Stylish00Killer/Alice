const ping = require('../../commands/ping');

describe('ping command', () => {
  it('should send "pong!"', async () => {
    const sock = {
      sendMessage: jest.fn(),
    };
    const msg = {
      key: {
        remoteJid: 'test@s.whatsapp.net',
      },
    };
    await ping.run(sock, msg, []);
    expect(sock.sendMessage).toHaveBeenCalledWith(
      'test@s.whatsapp.net',
      { text: 'pong!' },
      { quoted: msg }
    );
  });
});
