'use strict';
const crypto = require('crypto');

module.exports = {
  /**
   * 生成OSS直传的签名
   * @param {String} accessKeySecret accessKeySecret
   * @param {Object} policy 策略
   * @return {Object} 返回base64编码的policy和加密后的signature
   *
   * example:{
   *  policy:'xxxxxxxx==',
   *  signature:'yyyyyyyyyy=='
   * }
   */
  generationAliyunOSSSignature(accessKeySecret, policy) {
    // const policy = {
    //   expiration: expTime.toISOString(),
    //   conditions: [['starts-with', '$key', dir]]
    // };
    const expTime = new Date(Date.now() + 30 * 1000);
    const defaultPolicy = {
      expiration: expTime.toISOString()
    };
    !policy && (policy = defaultPolicy);
    const policyBase64 = Buffer.from(JSON.stringify(policy), 'utf8').toString(
      'base64'
    );
    const hmac = crypto.createHmac('sha1', accessKeySecret);
    hmac.update(policyBase64);
    const signature = hmac.digest('base64');
    return {
      policy: policyBase64,
      signature
    };
  }
};
