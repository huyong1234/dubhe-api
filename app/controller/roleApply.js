'use strict';

const Controller = require('egg').Controller;

class RoleApplyController extends Controller {
  // 根绝角色id查询权限列表
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
    const roleId = parseInt(param.id);
    const roleApply = await this.ctx.service.roleApply.getRoleApplyList(roleId);
    this.ctx.body = roleApply;
  }

  // 新增权限接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    const rules = {
      roleId: {
        required: true,
        type: 'string'
      },
      applyId: {
        required: true,
        type: 'string'
      },
      applyOrderBy: {
        required: true,
        type: 'string'
      },
      applyGroupId: {
        required: true,
        type: 'string'
      },
      applyGroupOderBy: {
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
    params.roleId = parseInt(params.roleId);
    params.applyId = parseInt(params.applyId);
    params.applyOrderBy = parseInt(params.applyOrderBy);
    params.applyGroupId = parseInt(params.applyGroupId);
    params.applyGroupOderBy = parseInt(params.applyGroupOderBy);
    const apply = await this.ctx.service.roleApply.createRoleApply(params);
    this.ctx.body = apply;
  }

  // 删除权限接口
  async destroy() {
    // 获取url参数
    const applyId = this.ctx.params.id;
    const roleId = this.ctx.request.body.roleId;
    const params = {};
    params.applyId = applyId;
    params.roleId = roleId;
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'string'
      },
      applyId: {
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
    params.applyId = parseInt(params.applyId);
    const result = await this.ctx.service.roleApply.destroy(params);
    if (result[0] === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = RoleApplyController;
