const afk = require('./afk');
const closeAll = require('./close-all');
const group = require('./group');
const grouplink = require('./grouplink');
const hidetag = require('./hidetag');
const onhidetag = require('./onhidetag');
const offhidetag = require('./offhidetag');
const kick = require('./kick');
const openAll = require('./open-all');
const ping = require('./ping');
const remove = require('./remove');
const tagall = require('./tagall');

const commands = new Map([
  [afk.name, afk],
  [closeAll.name, closeAll],
  [group.name, group],
  [grouplink.name, grouplink],
  [hidetag.name, hidetag],
  [onhidetag.name, onhidetag],
  [offhidetag.name, offhidetag],
  [kick.name, kick],
  [openAll.name, openAll],
  [ping.name, ping],
  [remove.name, remove],
  [tagall.name, tagall],
]);

const { checkPermissions } = require('../middleware/commandPermissions');

exports.handle = async (sock, msg) => {
  try {
    const body = msg.message.conversation;
    if (!body) return;

    const [rawCmd, ...args] = body.trim().split(' ');
    const prefix = require('../config').prefix;
    if (!rawCmd.startsWith(prefix)) return;

    const cmdName = rawCmd.slice(prefix.length).toLowerCase();
    const cmd = commands.get(cmdName);

    if (!cmd) return;

    const hasPermission = await checkPermissions(sock, msg, cmd);
    if (!hasPermission) {
      // Maybe send a message to the user that they don't have permission.
      // For now, just return.
      return;
    }

    await cmd.run(sock, msg, args);
  } catch (e) {
    require('../utils/logger').error('Command handler error', e);
  }
};
