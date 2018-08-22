'use strict';

const Service = require('egg').Service;
// 查询字段
const fields = [
  'id',
  'scenicId',
  'parentId',
  'name',
  'subName',
  'icon',
  'orderBy',
  'sys_adder',
  'sys_updator',
  'created_at',
  'updated_at'
];

class ScenicStatisTypeService extends Service {
  // 查询列表
  async getScenicStatisTypeList(params) {
    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      limit: {
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      },
      scenicId: {
        type: 'int',
        required: false
      }
    };
    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + 'is' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(errors);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      parentId: 0,
      sys_isDelete: 0
    };
    if (params.scenicId) {
      whereSearch.scenicId = params.scenicId;
    }
    if (params.name) {
      whereSearch.name = params.name;
    }
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      attributes: fields
    });

    return dbScenicStatisTypes;
  }

  // 查询单个
  async getScenicStatisType(id) {
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.findById(id, {
      attributes: fields
    });
    return dbScenicStatisTypes;
  }

  // 新建
  async addScenicStatisType(params) {
    const createRule = {
      scenicId: {
        type: 'int',
        required: true
      },
      parentId: {
        type: 'int',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      subName: {
        type: 'string',
        required: false
      },
      icon: {
        type: 'string',
        required: true
      },
      sys_adder: {
        required: true,
        type: 'int'
      }
    };

    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + 'is' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(errors);
      this.ctx.throw(400, err);
    }
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.create(params);
    // 新建返回对象
    const scenicStatisTypes = {
      id: dbScenicStatisTypes.id,
      scenicId: dbScenicStatisTypes.scenicId,
      parentId: dbScenicStatisTypes.parentId,
      name: dbScenicStatisTypes.name,
      subName: dbScenicStatisTypes.subName,
      icon: dbScenicStatisTypes.icon,
      orderBy: dbScenicStatisTypes.orderBy,
      sys_adder: dbScenicStatisTypes.sys_adder,
      sys_updator: dbScenicStatisTypes.sys_updator,
      created_at: dbScenicStatisTypes.created_at,
      updated_at: dbScenicStatisTypes.updated_at
    };
    return scenicStatisTypes;
  }

  // 修改
  async updateScenicStatisType(params) {
    const createRule = {
      id: {
        type: 'int',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      icon: {
        type: 'string',
        required: true
      },
      subName: {
        type: 'string',
        required: false
      },
      sys_updator: {
        type: 'int',
        required: true
      }
    };

    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + 'is' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      id: params.id
    };
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.update(params, {
      where: whereSearch
    });
    return dbScenicStatisTypes;
  }

  // 删除
  async deleteScenicStatisType(param) {
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.update(
      {
        sys_isDelete: 1
      },
      {
        where: {
          id: param
        }
      }
    );
    return dbScenicStatisTypes;
  }

  // 查询数据总量
  async getTotal(scenic_id) {
    const whereSearch = {
      scenicId: scenic_id,
      sys_isDelete: 0
    };
    const total = await this.app.model.ScenicStatisType.count({
      where: whereSearch
    });
    return total;
  }
}

module.exports = ScenicStatisTypeService;
