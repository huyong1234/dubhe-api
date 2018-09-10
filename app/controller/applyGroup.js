'use strict';

const Controller = require('egg').Controller;

class ApplyGroupController extends Controller {
  // 查询列表
  async index() {
    // 获取url参数
    const params = this.ctx.request.query;
    this.app.logger.debug('获取应用分组列表接口参数：' + params);
    // sting转int
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    params.companyId = parseInt(params.companyId);
    console.log(params);
    // 配置校验规则
    const rules = {
      limit: {
        required: true,
        type: 'int'
      },
      offSet: {
        required: true,
        type: 'int'
      },
      companyId: {
        type: 'int',
        required: true
      },
      name: {
        required: false,
        type: 'string'
      }
    };
    // 参数验证
    this.app.logger.debug('valid controller params begin...');
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
    this.app.logger.debug('valid controller params end');
    // 调用service，获取数据列表
    const applyGroup = await this.ctx.service.applyGroup.getApplyGroupList(params);
    // 将数据总条数，放入响应头
    this.ctx.response.set('total', applyGroup.total);
    this.ctx.body = applyGroup.applyGroupList;
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
    this.app.logger.debug('新建应用分组列表接口参数：' + params);
    params.orderBy = parseInt(params.orderBy);
    params.companyId = parseInt(params.companyId);
    params.sys_adder = parseInt(params.sys_adder);
    const rules = {
      name: {
        required: true,
        type: 'string'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      companyId: {
        required: true,
        type: 'int'
      },
      sys_adder: {
        required: true,
        type: 'int'
      }
    };
    this.app.logger.debug('valid controller params begin...');
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
    this.app.logger.debug('valid controller params end');
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
    params.companyId = parseInt(params.companyId);
    params.orderBy = parseInt(params.orderBy);
    params.sys_updator = parseInt(params.sys_updator);
    this.app.logger.debug('更新应用分组列表接口参数：' + params);
    const rules = {
      id: {
        required: true,
        type: 'int'
      },
      name: {
        required: true,
        type: 'string'
      },
      companyId: {
        required: true,
        type: 'int'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      sys_updator: {
        type: 'int',
        required: true
      }
    };
    this.app.logger.debug('valid controller params begin...');
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
    this.app.logger.debug('valid controller params end');
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
