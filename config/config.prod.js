'use strict';

module.exports = (appInfo) => {
  const config = (exports = {});

  config.logger = {
    level: 'NONE',
    consoleLevel: 'WARN',
    disableConsoleAfterReady: false
  };

  config.sequelize = {
    dialect: 'mssql',
    database: 'ecology',
    host: '192.168.100.121',
    port: 1433,
    username: 'OAAdmin',
    password: 'w9E5F1Z9I6r1AHNA'
  };

  // Aliyun OSS Config
  config.aliyunOSS = {
    accessKeyId: 'LTAI6eaMwrZ3cOof',
    accessKeySecret: 'dKZQ0HoKvRDuCg3gZr0ryGhoYDCWSS',
    bucket: 'test-dubhe-app',
    endpoint: 'oss-cn-shanghai.aliyuncs.com',
    policys: {
      banner: {
        expiration: 30,
        dir: 'banner/'
      },
      apply: {
        expiration: 30,
        dir: 'apply/'
      },
      scenicStatis: {
        expiration: 30,
        dir: 'scenic-statis/'
      }
    }
  };
  return config;
};
