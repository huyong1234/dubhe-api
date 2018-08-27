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

class DataLatitudeService extends Service {
  // 查询数据纬度列表
  async getDataLatitudes(id) {
    const whereSearch = {
      parentId: id,
      sys_isDelete: 0
    };
    const dataLatitudes = await this.app.model.DataLatitude.findAll({
      where: whereSearch,
      order: ['orderBy'],
      attributes: fields
    });
    return dataLatitudes;
  }
  // 根据id查询
  async getDataLatitude(id) {
    const dbDataLatitudes = await this.app.model.DataLatitude.findById(id, {
      attributes: fields
    });
    return dbDataLatitudes;
  }

  // 新增
  async addDataLatitude(params) {
    // 配置校验规则
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
      sys_adder: {
        type: 'int',
        required: true
      }
    };
    // 参数校验
    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    //
    const dbDataLatitudes = await this.app.model.DataLatitude.create(params);
    // 新建返回对象
    const newDataLatitude = {
      id: dbDataLatitudes.id,
      scenicId: dbDataLatitudes.scenicId,
      parentId: dbDataLatitudes.parentId,
      name: dbDataLatitudes.name,
      subName: dbDataLatitudes.subName,
      icon: dbDataLatitudes.icon,
      orderBy: dbDataLatitudes.orderBy,
      sys_adder: dbDataLatitudes.sys_adder,
      sys_updator: dbDataLatitudes.sys_updator,
      created_at: dbDataLatitudes.created_at,
      updated_at: dbDataLatitudes.updated_at
    };

    return newDataLatitude;
  }

  // 更新
  async updateDataLatitude(params) {
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
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      id: params.id
    };
    // 更新数据
    const dbDataLatitudes = await this.app.model.DataLatitude.update(params, {
      where: whereSearch
    });
    return dbDataLatitudes;
  }

  // 删除
  async deleteDataLatitude(param) {
    const dbDataLatitudes = await this.app.model.DataLatitude.update(
      // 执行删除操作，并不是物理删除，而是把sys_isDelete的值改为1
      {
        sys_isDelete: 1
      },
      {
        where: {
          id: param
        }
      }
    );
    return dbDataLatitudes;
  }
}

module.exports = DataLatitudeService;
