'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  // 查询角色列表
  async getRoleList() {
    const roles = await this.app.model.Role.findAll({
      attributes: ['id', 'name']
    });
    return roles;
  }
  // 查询单个角色
  async getRole(id) {
    const role = await this.app.model.Role.findById(id);
    return role;
  }
}

module.exports = RoleService;
