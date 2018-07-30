'use strict';

const Controller = require('egg').Controller;

class ApplyController extends Controller {
// 查询接口
  async index() {
    // 获取url参数
    const params = this.ctx.request.query;
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
      },
      actionType: {
        required: false,
        type: 'string'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      throw '参数错误';
    }
    const applyGroup = await this.ctx.service.apply.index(params);
    this.ctx.body = applyGroup;
  }

  // 新建接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    const rules = {
      name: {
        required: false,
        type: 'string'
      },
      oderBy: {
        required: false,
        type: 'string'
      },
      companyId: {
        required: false,
        type: 'string'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      throw '参数错误';
    }
    const applyGroup = await this.ctx.service.applyGroup.create(params);
    this.ctx.body = applyGroup;
  }

  // 更新接口
  async update() {
    const id = this.ctx.params.id;
    // 获取post提交的参数
    const params = this.ctx.request.body;
    params.id = id;
    const rules = {
      id: {
        required: true,
        type: 'string'
      },
      name: {
        required: false,
        type: 'string'
      },
      oderBy: {
        required: false,
        type: 'string'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      throw '参数错误';
    }
    const applyGroup = await this.ctx.service.applyGroup.update(params);
    this.ctx.body = applyGroup;
  }

  // 删除接口
  async destroy() {
    // 获取url参数
    const id = this.ctx.params.id;
    const applyGroup = await this.ctx.service.applyGroup.destroy(id);
    this.ctx.body = applyGroup;
  }
}

module.exports = ApplyController;
