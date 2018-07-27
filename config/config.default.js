'use strict';

module.exports = (appInfo) => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1530496785815_2032';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: false
  };
  config.sequelize = {
    dialect: 'mssql',
    database: 'ecology',
    host: 'localhost',
    port: '1433',
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
