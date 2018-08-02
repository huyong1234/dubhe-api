'use strict';

const Controller = require('egg').Controller;

class DataLatitudeController extends Controller {
  async create() {
    const params = this.ctx.request.body;
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
        type: 'string',
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
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    params.orderBy = parseInt(params.orderBy);
    const dataLatitude = await this.ctx.service.dataLatitude.addDataLatitude(
      params
    );
    const newDataLatitude = {};
    newDataLatitude.id = dataLatitude.id;
    newDataLatitude.name = dataLatitude.name;
    newDataLatitude.orderBy = dataLatitude.orderBy;
    this.ctx.body = newDataLatitude;
  }

  async update() {
    const id = this.ctx.params.id;
    const params = this.ctx.request.body;
    params.id = id;
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
        type: 'string',
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
    params.orderBy = parseInt(params.orderBy);
    const dataLatitudeResult = await this.ctx.service.dataLatitude.updateDataLatitude(
      params
    );
    if (dataLatitudeResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    const dataLatitude = await this.ctx.service.dataLatitude.getDataLatitude(
      params.id
    );
    const newDataLatitude = {};
    newDataLatitude.id = dataLatitude.id;
    newDataLatitude.name = dataLatitude.name;
    newDataLatitude.orderBy = dataLatitude.orderBy;
    this.ctx.body = newDataLatitude;
  }

  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const dataLatitude = await this.ctx.service.dataLatitude.deleteDataLatitude(id);
    if (dataLatitude === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = DataLatitudeController;
