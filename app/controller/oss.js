'use strict';

const Controller = require('egg').Controller;

class OssController extends Controller {
  /**
   * 获取Banner上传路径及签名
   *
   * example:
    {
      accessid: 'LTAI6eaMwrZ3cOof',
      host: 'http://test-dubhe-app.oss-cn-shanghai.aliyuncs.com',
      policy:
        'eyJleHBpcmF0aW9uIjoiMjAxOC0wNy0yNlQxNTowMDo0NC4yODNaIiwiY29uZGl0aW9ucyI6W1sic3RhcnRzLXdpdGgiLCIka2V5IiwidGVzdC8iXV19',
      signature: '8YpCjthwT9CRxpkLYR8DSesWERM=',
      expire: 1532617244.283,
      dir: 'test/'
    };
   */
  async getBannerUploadPathAndSignature() {
    const {
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policys: { banner: bannerPolicyConfig } // 使用Banner Policy
    } = this.app.config.aliyunOSS;

    // 调用service
    const result = await this.service.oss.getUploadPathAndSignature({
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policy: bannerPolicyConfig
    });
    this.ctx.body = result;
  }

  /**
   * 获取应用（Apply）上传路径及签名
   *
   * example:
    {
      accessid: 'LTAI6eaMwrZ3cOof',
      host: 'http://test-dubhe-app.oss-cn-shanghai.aliyuncs.com',
      policy:
        'eyJleHBpcmF0aW9uIjoiMjAxOC0wNy0yNlQxNTowMDo0NC4yODNaIiwiY29uZGl0aW9ucyI6W1sic3RhcnRzLXdpdGgiLCIka2V5IiwidGVzdC8iXV19',
      signature: '8YpCjthwT9CRxpkLYR8DSesWERM=',
      expire: 1532617244.283,
      dir: 'test/'
    };
   */
  async getApplyUploadPathAndSignature() {
    const {
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policys: { apply: applyPolicyConfig }
    } = this.app.config.aliyunOSS;

    // 调用service
    const result = await this.service.oss.getUploadPathAndSignature({
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policy: applyPolicyConfig
    });
    this.ctx.body = result;
  }

  /**
   * 获取景区数据模块（ScenicStatis）上传路径及签名
   *
   * example:
    {
      accessid: 'LTAI6eaMwrZ3cOof',
      host: 'http://test-dubhe-app.oss-cn-shanghai.aliyuncs.com',
      policy:
        'eyJleHBpcmF0aW9uIjoiMjAxOC0wNy0yNlQxNTowMDo0NC4yODNaIiwiY29uZGl0aW9ucyI6W1sic3RhcnRzLXdpdGgiLCIka2V5IiwidGVzdC8iXV19',
      signature: '8YpCjthwT9CRxpkLYR8DSesWERM=',
      expire: 1532617244.283,
      dir: 'test/'
    };
   */
  async getScenicStatisUploadPathAndSignature() {
    const {
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policys: { scenicStatis: scenicStatisPolicyConfig }
    } = this.app.config.aliyunOSS;

    // 调用service
    const result = await this.service.oss.getUploadPathAndSignature({
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policy: scenicStatisPolicyConfig
    });
    this.ctx.body = result;
  }

  /**
   * 获取通知模块（Notice）上传路径及签名
   */
  async getNoticeUploadPathAndSignature() {
    const {
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policys: { noytice: noticePolicyConfig }
    } = this.app.config.aliyunOSS;

    // 调用service
    const result = await this.service.oss.getUploadPathAndSignature({
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
      policy: noticePolicyConfig
    });
    this.ctx.body = result;
  }

  /**
   * 获取加密后的OSS访问地址
   */
  async getSignatureUrl() {
    const { path } = this.ctx.params;
    // 调用service
    const result = await this.service.oss.getSignatureUrl(path);
    this.ctx.body = result;
  }
}

module.exports = OssController;
