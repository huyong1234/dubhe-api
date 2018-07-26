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

  return config;
};
