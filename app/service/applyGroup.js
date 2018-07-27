'use strict';

const Service = require('egg').Service;

class ApplyGroupService extends Service {
  // 查询
  async index(params) {
    // 查询参数
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    const id = params.id;
    const name = params.name;
    let whereSearch;
    if (id !== undefined) {
      whereSearch = {
        sys_isDelete: 0,
        id: parseInt(params.id)
      };
    }
    if (name !== undefined) {
      whereSearch = {
        sys_isDelete: 0,
        name: params.name
      };
    }
    const applyGroup = await this.app.model.ApplyGroup.findAll({
      where: whereSearch,
      limit: params.limit, // 将string 转 int
      offset: params.offSet,
      attributes: ['id', 'name', 'oderBy']
    });
    return applyGroup;
  }
  // 新建
  async create(params) {
    params.orderBy = parseInt(params.orderBy);
    const applyGroup = await this.app.model.ApplyGroup.create(params);
    return applyGroup;
  }
  // 修改
  async update(params) {
    // 设置where条件
    const whereSearch = {
      id: params.id
    };
    // 数据库更新操作
    const applyGroup = await this.app.model.ApplyGroup.update(params, {
      where: whereSearch
    });
    return applyGroup;
  }
}

module.exports = ApplyGroupService;
