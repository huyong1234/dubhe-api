'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  async getDepartment(id) {
    const department = await this.app.model.Department.findById(id);
    return department;
  }
}

module.exports = DepartmentService;
