'use strict';

const Service = require('egg').Service;

class ApplyGroupService extends Service {
  async getApplyGroup(params) {
    // 分页参数
    const page = { offset: params.offSet, limit: params.limit };
    // 查询参数
    let where;
    if (params.id) {
      where = {
        isDeleted: 0,
        id: params.id
      };
    }
    const applyGroup = await this.app.model.ApplyGroup.findAll(where, page);
    return applyGroup;
  }
}

module.exports = ApplyGroupService;
