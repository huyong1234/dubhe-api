'use strict';

const ConsoleAllLogger = require('./app/utils/consoleAllLogger');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    // app.getLogger('logger').set('docker', new ConsoleAllLogger({ level: 'INFO', app }));
    // app.getLogger('coreLogger').set('docker', new ConsoleAllLogger({ level: 'INFO', app }));
    // app.getLogger('agentLogger').set('docker', new ConsoleAllLogger({ level: 'INFO', app }));
    app.getLogger('errorLogger').set('docker', new ConsoleAllLogger({ level: 'INFO', app }));
  }
};
