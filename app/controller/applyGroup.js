'use strict';

const Controller = require('egg').Controller;

class ApplyGroupController extends Controller {
  // 查询列表
  async index() {
    // 获取url参数
    const params = this.ctx.request.query;
    console.log(params);
    // 将string类型转换成int类型
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    // 配置校验规则
    const rules = {
      limit: {
        required: true,
        type: 'integer'
      },
      offSet: {
        required: true,
        type: 'integer'
      },
      name: {
        required: false,
        type: 'string'
      }
    };
    // 参数验证
    const errors = this.app.validator.validate(rules, params);
    // 抛出错误异常
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    const applyGroup = await this.ctx.service.applyGroup.getApplyGroupList(params);
    this.ctx.body = applyGroup;
  }

  // 查询单个
  async show() {
    const id = this.ctx.params.id;
    const applyGroup = await this.ctx.service.applyGroup.getApplyGroup(id);
    this.ctx.body = applyGroup;
  }

  // 新建接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    const rules = {
      name: {
        required: true,
        type: 'string'
      },
      oderBy: {
        required: true,
        type: 'string'
      },
      companyId: {
        required: true,
        type: 'string'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    // 抛出错误异常
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    params.oderBy = parseInt(params.oderBy);
    const applyGroup = await this.ctx.service.applyGroup.createApplyGroup(params);
    this.ctx.body = applyGroup;
  }

  // 更新接口
  async update() {
    const id = this.ctx.params.id;
    // 获取post提交的参数
    const params = this.ctx.request.body;
    params.id = id;
    params.id = parseInt(params.id);
    params.oderBy = parseInt(params.oderBy);
    const rules = {
      id: {
        required: true,
        type: 'integer'
      },
      name: {
        required: true,
        type: 'string'
      },
      oderBy: {
        required: true,
        type: 'integer'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    // 抛出错误异常
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    const result = await this.ctx.service.applyGroup.update(params);
    // 判断数据库操作是否成功，操作失败则抛出异常
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 返回更新后的applyGroup
    const applyGroup = await this.ctx.service.applyGroup.getApplyGroup(params.id);
    this.ctx.body = applyGroup;
  }

  // 删除接口
  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const applyGroup = await this.ctx.service.applyGroup.destroy(id);
    if (applyGroup === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = ApplyGroupController;
