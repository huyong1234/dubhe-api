'use strict';

const Service = require('egg').Service;

class DataLatitudeService extends Service {
  async getDataLatitude(id) {
    const dbDataLatitudes = await this.app.model.DataLatitude.findById(id);
    return dbDataLatitudes;
  }
  async addDataLatitude(params) {
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
    const dbDataLatitudes = await this.app.model.DataLatitude.create(params);

    return dbDataLatitudes;
  }

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
        const message = errors[index].field + 'is' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(errors);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      id: params.id
    };
    const dbDataLatitudes = await this.app.model.DataLatitude.update(params, {
      where: whereSearch
    });
    return dbDataLatitudes;
  }

  async deleteDataLatitude(param) {
    const dbDataLatitudes = await this.app.model.DataLatitude.update(
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
