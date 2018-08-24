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
    password: 'w9E5F1Z9I6r1AHNA',
    timezone: '+08:00' // 设置为东八区时间，默认为零时区
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

  config.oss = {
    client: {
      accessKeyId: 'LTAI6eaMwrZ3cOof',
      accessKeySecret: 'dKZQ0HoKvRDuCg3gZr0ryGhoYDCWSS',
      bucket: 'test-dubhe-app',
      endpoint: 'oss-cn-shanghai.aliyuncs.com',
      timeout: '60s'
    }
  };
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = err.message;
    }
  };

  return config;
};
