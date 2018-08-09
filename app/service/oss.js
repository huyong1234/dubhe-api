'use strict';

const Service = require('egg').Service;

class OssService extends Service {
  /**
   * 生成Banner上传路径及签名
   *
   * @param {Object} config 配置
   * example:{
   *  accessKeyId:'LTAI6eaMwrZ3cOof',
      accessKeySecret:'xxxxxxxx',
      bucket:'test-dubhe-app',
      endpoint:'oss-cn-shanghai.aliyuncs.com',
      policyConfig:{
        dir:'banner/',
        expiration: 30
      }
   * }
   * @return {Object} UploadConfig
   * example:
    {
      accessid: 'LTAI6eaMwrZ3cOof',
      host: 'http://test-dubhe-app.oss-cn-shanghai.aliyuncs.com',
      policy:
        'eyJleHBpcmF0aW9uIjoiMjAxOC0wNy0yNlQxNTowMDo0NC4yODNaIiwiY29uZGl0aW9ucyI6W1sic3RhcnRzLXdpdGgiLCIka2V5IiwidGVzdC8iXV19',
      signature: '8YpCjthwT9CRxpkLYR8DSesWERM=',
      expire: 1532617244.283,
      dir: 'banner/'
    };
   */
  async getUploadPathAndSignature(config) {
    const { accessKeyId, accessKeySecret, bucket, endpoint, policy } = config;

    if (!accessKeyId) this.ctx.throw('accessKeyId必须存在');
    if (!accessKeySecret) this.ctx.throw('accessKeySecret必须存在');
    if (!bucket) this.ctx.throw('bucket必须存在');
    if (!endpoint) this.ctx.throw('bucket必须存在');
    if (!policy) this.ctx.throw('policys必须存在');

    this.ctx.logger.info('Generation upload path and signature beginning ...');
    const expTime = new Date(Date.now() + policy.expiration * 1000);
    const policyObj = {
      expiration: expTime.toISOString(),
      conditions: [[ 'starts-with', '$key', policy.dir ]]
    };

    const { policy: policyBase64, signature } = this.ctx.helper.generationAliyunOSSSignature(
      accessKeySecret,
      policyObj
    );

    const result = {
      accessid: accessKeyId,
      dir: policy.dir,
      expire: expTime.getTime() / 1000,
      host: `http://${bucket}.${endpoint}`,
      policy: policyBase64,
      signature
    };
    this.ctx.logger.info('Return:', result);
    this.ctx.logger.info('Generation upload path and signature are successfully');
    return result;
  }
}

module.exports = OssService;
