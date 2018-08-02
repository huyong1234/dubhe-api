'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  // 查询列表
  async index() {
    const roles = await this.ctx.service.role.getRoleList();
    this.ctx.body = roles;
  }
  // 查询单个
  async show() {
    const id = this.ctx.params.id;
    const role = await this.ctx.service.role.getRole(id);
    this.ctx.body = role;
  }
}

module.exports = RoleController;
