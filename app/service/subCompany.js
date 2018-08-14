'use strict';

const Service = require('egg').Service;

class SubCompanyService extends Service {
  async getSubCompany(id) {
    const subCompany = await this.app.model.SubCompany.findById(id);
    return subCompany;
  }
}

module.exports = SubCompanyService;
