'use strict';

const Service = require('egg').Service;

class ApplyService extends Service {
// 查询
  async index(params) {
    // 查询参数
    params.limit = parseInt(params.limit); // string 转 int
    params.offSet = parseInt(params.offSet);
    const id = params.id;
    const name = params.name;
    const actionType = params.actionType;
    let whereSearch;
    if (id !== undefined) {
      const id = parseInt(params.id);
      const apply = await this.app.model.Apply.findById(id);
      return apply;
    }
    if (name !== undefined) {
      whereSearch = {
        sys_isDelete: 0,
        name: params.name
      };
      const applyGroup = await this.app.model.ApplyGroup.findAll({
        where: whereSearch
        // limit: params.limit,  这里有疑问需要讨论一些
        // offset: params.offSet
      });
      return applyGroup;
    }
    if (id === undefined && name === undefined) {
      const applyGroup = await this.app.model.ApplyGroup.findAll({
        limit: params.limit,
        offset: params.offSet,
        attributes: ['id', 'name', 'oderBy']
      });
      return applyGroup;
    }
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

  // 删除
  async destroy(param) {
    const applyGroup = await this.app.model.ApplyGroup.destroy({
      where: {
        id: parseInt(param)
      }
    });
    if (applyGroup === 1) {
      return null;
    }
    return applyGroup;
  }
}

module.exports = ApplyService;
