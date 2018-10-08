'use strict';

const Controller = require('egg').Controller;

class RoleScenicStatisController extends Controller {
  // 查询权限接口
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
    const roleApply = await this.ctx.service.roleScenicStatis.getRoleScenicStatisList(roleId);
    this.ctx.body = roleApply;
  }

  // 新增权限接口
  async create() {
    // 获取post提交的参数
    const params = this.ctx.request.body;
    this.app.logger.debug('新增数据权限接口参数' + params);
    params.roleId = parseInt(params.roleId);
    params.scenicStatisId = parseInt(params.scenicStatisId);
    params.scenicStatisOrderBy = parseInt(params.scenicStatisOrderBy);
    params.dataLatitudeId = parseInt(params.dataLatitudeId);
    params.dataLatitudeOrderBy = parseInt(params.dataLatitudeOrderBy);
    params.scenicStatisTypeId = parseInt(params.scenicStatisTypeId);
    params.scenicStatisTypeOrderBy = parseInt(params.scenicStatisTypeOrderBy);
    params.sys_adder = parseInt(params.sys_adder);
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      scenicStatisId: {
        required: true,
        type: 'int'
      },
      scenicStatisOrderBy: {
        required: true,
        type: 'int'
      },
      dataLatitudeId: {
        required: true,
        type: 'int'
      },
      dataLatitudeOrderBy: {
        required: true,
        type: 'int'
      },
      scenicStatisTypeId: {
        type: 'int',
        required: true
      },
      scenicStatisTypeOrderBy: {
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
    const roleScenicStatis = await this.ctx.service.roleScenicStatis.createRoleScenicStatis(params);
    this.ctx.body = roleScenicStatis;
  }

  // 删除权限接口
  async destroy() {
    // 获取url参数
    const scenicStatisId = this.ctx.params.id;
    const roleId = this.ctx.request.query.roleId;
    const dataLatitudeId = this.ctx.request.query.dataLatitudeId;
    const scenicStatisTypeId = this.ctx.request.query.scenicStatisTypeId;
    const sys_updator = this.ctx.request.query.sys_updator;
    const params = {};
    params.scenicStatisId = parseInt(scenicStatisId);
    params.dataLatitudeId = parseInt(dataLatitudeId);
    params.scenicStatisTypeId = parseInt(scenicStatisTypeId);
    params.sys_updator = parseInt(sys_updator);
    params.roleId = parseInt(roleId);
    this.app.logger.debug('删除数据权限接口参数' + JSON.stringify(params));
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      scenicStatisId: {
        required: true,
        type: 'int'
      },
      dataLatitudeId: {
        required: true,
        type: 'int'
      },
      scenicStatisTypeId: {
        required: true,
        type: 'int'
      },
      sys_updator: {
        required: true,
        type: 'int'
      }
    };
    // 参数校验
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
    const result = await this.ctx.service.roleScenicStatis.destroy(params);
    if (result[0] === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = RoleScenicStatisController;
