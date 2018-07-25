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
    dialect: 'sqlserver', // support: mysql, mariadb, postgres, mssql
    database: 'test',
    host: 'localhost',
    port: '1433',
    username: 'root',
    password: ''
  };

  return config;
};
