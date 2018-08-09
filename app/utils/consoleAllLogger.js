'use strict';

const util = require('util');
const Transport = require('egg-logger').Transport;

class ConsoleAllLogger extends Transport {
  // 定义 log 方法，在此方法中把日志上报给远端服务
  log(level, args) {
    let log;
    console.debug('[ConsoleAllLogger] 进入docker日志管道');
    if (args[0] instanceof Error) {
      const err = args[0];
      log = util.format('%s: %s\n%s\npid: %s\n', err.name, err.message, err.stack, process.pid);
      console.error(log);
    } else {
      log = util.format(...args);
      console.info(log);
    }
  }
}
module.exports = ConsoleAllLogger;
