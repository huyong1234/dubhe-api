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
    params.roleId = parseInt(params.roleId);
    params.applyId = parseInt(params.applyId);
    params.sys_adder = parseInt(params.sys_adder);
    params.applyOrderBy = parseInt(params.applyOrderBy);
    params.applyGroupId = parseInt(params.applyGroupId);
    params.applyGroupOrderBy = parseInt(params.applyGroupOrderBy);
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      applyId: {
        required: true,
        type: 'int'
      },
      applyOrderBy: {
        required: true,
        type: 'int'
      },
      applyGroupId: {
        required: true,
        type: 'int'
      },
      applyGroupOrderBy: {
        required: true,
        type: 'int'
      },
      sys_adder: {
        required: true,
        type: 'int'
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
    const apply = await this.ctx.service.roleApply.createRoleApply(params);
    this.ctx.body = apply;
  }

  // 删除权限接口
  async destroy() {
    // 获取url参数
    const applyId = this.ctx.params.id;
    const roleId = this.ctx.request.body.roleId;
    const sys_updator = this.ctx.request.body.sys_updator;
    const params = {};
    params.applyId = parseInt(applyId);
    params.roleId = parseInt(roleId);
    params.sys_updator = parseInt(sys_updator);
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      applyId: {
        required: true,
        type: 'int'
      },
      sys_updator: {
        required: true,
        type: 'int'
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
    const result = await this.ctx.service.roleApply.destroy(params);
    if (result[0] === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = RoleApplyController;
