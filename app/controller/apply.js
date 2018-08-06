'use strict';

const Controller = require('egg').Controller;

class ApplyController extends Controller {
  // 查询列表
  async index() {
    // 获取url参数
    const params = this.ctx.request.query;
    console.log(params);
    // 将string类型转换成int类型
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    if (params.actionType) {
      params.actionType = parseInt(params.actionType);
    }
    if (params.id) {
      params.id = parseInt(params.id);
    }
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
      },
      actionType: {
        required: false,
        type: 'integer'
      },
      id: {
        required: false,
        type: 'integer'
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
    const apply = await this.ctx.service.apply.getApplyList(params);
    this.ctx.body = apply;
  }

  // // 查询单个
  async show() {
    const id = this.ctx.params.id;
    const apply = await this.ctx.service.apply.getApply(id);
    this.ctx.body = apply;
  }

  // 新建接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    // 配置校验规则
    const rules = {
      name: {
        required: true,
        type: 'string'
      },
      applyGroupId: {
        required: true,
        type: 'string'
      },
      orderBy: {
        required: true,
        type: 'string'
      },
      actionType: {
        required: true,
        type: 'string'
      },
      icon: {
        required: true,
        type: 'string'
      },
      action: {
        required: true,
        type: 'string'
      },
      sys_adder: {
        required: true,
        type: 'string'
      }
    };
    // 按规则检验参数
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
    // 将string类型的参数转为int类型
    params.orderBy = parseInt(params.orderBy);
    params.applyGroupId = parseInt(params.applyGroupId);
    params.actionType = parseInt(params.actionType);
    const apply = await this.ctx.service.apply.createApply(params);
    this.ctx.body = apply;
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
        required: true,
        type: 'string'
      },
      applyGroupId: {
        required: true,
        type: 'string'
      },
      orderBy: {
        required: true,
        type: 'string'
      },
      actionType: {
        required: true,
        type: 'string'
      },
      icon: {
        required: true,
        type: 'string'
      },
      action: {
        required: true,
        type: 'string'
      },
      sys_updator: {
        type: 'string',
        required: true
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
    params.id = parseInt(params.id);
    params.orderBy = parseInt(params.orderBy);
    params.applyGroupId = parseInt(params.applyGroupId);
    params.actionType = parseInt(params.actionType);
    const result = await this.ctx.service.apply.updateApply(params);
    // 判断数据库操作是否成功，操作失败则抛出异常
    if (result[0] === 0) { // result[0]表示数据库影响条数
      this.ctx.throw('数据更新失败');
    }
    // 返回更新后的applyGroup
    const applyGroup = await this.ctx.service.apply.getApply(params.id);

    this.ctx.body = applyGroup;
  }

  // 删除接口
  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const apply = await this.ctx.service.apply.destroy(id);
    if (apply === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = ApplyController;
