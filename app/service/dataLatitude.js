'use strict';

const Service = require('egg').Service;

class DataLatitudeService extends Service {
  // 根据id查询
  async getDataLatitude(id) {
    const dbDataLatitudes = await this.app.model.DataLatitude.findById(id);
    return dbDataLatitudes;
  }

  // 新增
  async addDataLatitude(params) {
    // 配置校验规则
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
        required: true
      },
      icon: {
        type: 'string',
        required: true
      },
      sys_addTime: {
        type: 'string',
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

    return dbDataLatitudes;
  }

  // 更新
  async updateDataLatitude(params) {
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
