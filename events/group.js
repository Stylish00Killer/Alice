// events/group.js
const logger = require('../utils/logger');

module.exports = (sock) => {
  sock.ev.on('groups.update', async (updates) => {
    updates.forEach(update => {
      logger.info(`Group updated: ${JSON.stringify(update)}`);
    });
  });
};
