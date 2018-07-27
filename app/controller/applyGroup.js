'use strict';

const Controller = require('egg').Controller;

class ApplyGroupController extends Controller {
  async getApplyGroup() {
    // 获取url参数
    const params = this.ctx.request.query;
    console.log(typeof params.limit);
    // 配置校验规则
    const rules = {
      limit: {
        required: true,
        type: 'string'
      },
      offSet: {
        required: true,
        type: 'string'
      },
      id: {
        required: false,
        type: 'string'
      },
      name: {
        required: false,
        type: 'string'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      throw '参数错误';
    }
    const applyGroup = await this.ctx.service.applyGroup.getApplyGroup(params);
    this.ctx.body = applyGroup;
  }
}

module.exports = ApplyGroupController;
