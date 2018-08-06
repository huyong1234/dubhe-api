'use strict';

const Service = require('egg').Service;

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
    let whereSearch;
    if (params.name) {
      whereSearch = {
        sys_isDelete: 0,
        name: params.name
      };
    }
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.findAll({
      where: whereSearch,
      limit: params.limit,
      offSet: params.offSet,
      attributes: ['id', 'name', 'orderBy', 'icon']
    });

    return dbScenicStatisTypes;
  }

  // 查询单个
  async getScenicStatisType(id) {
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.findById(
      id
    );
    return dbScenicStatisTypes;
  }

  // 新建
  async addScenicStatisType(params) {
    const createRule = {
      scenicId: {
        type: 'string',
        required: true
      },
      parentId: {
        type: 'string',
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
        type: 'string'
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
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.create(
      params
    );
    return dbScenicStatisTypes;
  }

  // 修改
  async updateScenicStatisType(params) {
    const createRule = {
      id: {
        type: 'string',
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
        type: 'string',
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
      const err = JSON.stringify(errors);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      id: params.id
    };
    const dbScenicStatisTypes = await this.app.model.ScenicStatisType.update(
      params,
      {
        where: whereSearch
      }
    );
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
}

module.exports = ScenicStatisTypeService;
