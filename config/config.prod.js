'use strict';

module.exports = (appInfo) => {
  const config = (exports = {});

  config.logger = {
    level: 'NONE',
    consoleLevel: 'WARN',
    disableConsoleAfterReady: false
  };

  return config;
};
