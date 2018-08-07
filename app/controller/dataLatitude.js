'use strict';

const Controller = require('egg').Controller;

class DataLatitudeController extends Controller {
  // 查询接口
  async show() {
    const id = this.ctx.params.id;
    const dataLatitude = await this.ctx.service.dataLatitude.getDataLatitudes(id);
    this.ctx.body = dataLatitude;
  }
  // 新建接口
  async create() {
    // 获取formBody参数
    const params = this.ctx.request.body;
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
        type: 'string',
        required: true
      },
      subName: {
        type: 'string',
        required: false
      },
      sys_adder: {
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
    params.orderBy = parseInt(params.orderBy);
    params.sys_adder = parseInt(params.sys_adder);
    // 调用service
    const dataLatitude = await this.ctx.service.dataLatitude.addDataLatitude(params);
    // 新建返回对象
    const newDataLatitude = {};
    newDataLatitude.id = dataLatitude.id;
    newDataLatitude.name = dataLatitude.name;
    newDataLatitude.orderBy = dataLatitude.orderBy;
    this.ctx.body = newDataLatitude;
  }

  // 更新接口
  async update() {
    // 获取url参数
    const id = this.ctx.params.id;
    // 获取formBody参数
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
      subName: {
        type: 'string',
        required: false
      },
      sys_updator: {
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
    params.id = parseInt(params.id);
    params.orderBy = parseInt(params.orderBy);
    // 调用service,进行更新操作
    const dataLatitudeResult = await this.ctx.service.dataLatitude.updateDataLatitude(params);
    if (dataLatitudeResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service，获取更新后的数据
    const dataLatitude = await this.ctx.service.dataLatitude.getDataLatitude(params.id);
    // 新建返回对象
    const newDataLatitude = {};
    newDataLatitude.id = dataLatitude.id;
    newDataLatitude.name = dataLatitude.name;
    newDataLatitude.orderBy = dataLatitude.orderBy;
    this.ctx.body = newDataLatitude;
  }

  // 删除接口
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
