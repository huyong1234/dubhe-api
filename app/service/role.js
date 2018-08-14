'use strict';

const Service = require('egg').Service;
// 查询字段
const fields = [
  'id',
  'name',
  'sys_adder',
  'sys_updator',
  'created_at',
  'updated_at'
];

class RoleService extends Service {
  // 查询角色列表
  async getRoleList() {
    const roles = await this.app.model.Role.findAll({
      attributes: fields
    });
    return roles;
  }
  // 查询单个角色
  async getRole(id) {
    const role = await this.app.model.Role.findById(id, {
      attributes: fields
    });
    return role;
  }
}

module.exports = RoleService;
