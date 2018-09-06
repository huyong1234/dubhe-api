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
      },
      notice: {
        expiration: 30,
        dir: 'notice/'
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
      // 错误状态吗大于等于500则不返回前端错误信息
      if (this.status < 500) {
        ctx.body = err.message;
      }
    }
  };

  // 推送相关配置
  config.notify = {
    // url: 'http://127.0.0.1:7001/api/notice',
    url: 'http://api.zhaochewisdom.com/notify/api/notice',
    headers: {
      'ZC-Authorization': '5a9cb35668d85500019e5bf10f383e4606c342d997e5d69ea0373a77',
      'ZC-X-AccessKey': 'dubhe-app-push'
    }
  };

  // java接口
  config.department = {
    host: 'http://api.zhaochewisdom.com/dubhe-app/api/departments',
    headers: {
      'ZC-Authorization': '5a9cb35668d85500019e5bf10f383e4606c342d997e5d69ea0373a77'
    }
  };

  return config;
};
