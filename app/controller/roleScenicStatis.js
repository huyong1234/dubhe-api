'use strict';

const Controller = require('egg').Controller;

class RoleScenicStatisController extends Controller {
  async show() {
    // 获取url参数
    const param = this.ctx.params;
    // 参数验证
    const errors = this.app.validator.validate({ id: 'string' }, param);
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
    const userId = parseInt(param.id);
    const roleApply = await this.ctx.service.roleScenicStatis.getRoleScenicStatisList(userId);
    this.ctx.body = roleApply;
  }

  // 新增权限接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    const rules = {
      userId: {
        required: true,
        type: 'string'
      },
      scenicStatisId: {
        required: true,
        type: 'string'
      },
      orderBy: {
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
    params.userId = parseInt(params.userId);
    params.scenicStatisId = parseInt(params.scenicStatisId);
    params.orderBy = parseInt(params.orderBy);
    const roleScenicStatis = await this.ctx.service.roleScenicStatis.createRoleScenicStatis(params);
    this.ctx.body = roleScenicStatis;
  }

  // 删除权限接口
  async destroy() {
    // 获取url参数
    const scenicStatisId = this.ctx.params.id;
    const roleId = this.ctx.request.body.roleId;
    const params = {};
    params.scenicStatisId = scenicStatisId;
    params.roleId = roleId;
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'string'
      },
      scenicStatisId: {
        required: true,
        type: 'string'
      }
    };
    // 参数校验
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
    params.roleId = parseInt(params.roleId);
    params.scenicStatisId = parseInt(params.scenicStatisId);
    const result = await this.ctx.service.roleScenicStatis.destroy(params);
    if (result[0] === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = RoleScenicStatisController;
