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
    this.app.logger.debug('新建数据纬度接口参数：' + JSON.stringify(params));
    params.scenicId = parseInt(params.scenicId);
    params.parentId = parseInt(params.parentId);
    params.orderBy = parseInt(params.orderBy);
    params.sys_adder = parseInt(params.sys_adder);
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
    this.app.logger.debug('valid controller params begin...');
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
    this.app.logger.debug('valid controller params end');
    // 调用service
    const dataLatitude = await this.ctx.service.dataLatitude.addDataLatitude(params);
    this.ctx.body = dataLatitude;
  }

  // 更新接口
  async update() {
    // 获取url参数
    const id = this.ctx.params.id;
    // 获取formBody参数
    const params = this.ctx.request.body;
    params.id = id;
    params.id = parseInt(params.id);
    params.sys_updator = parseInt(params.sys_updator);
    params.orderBy = parseInt(params.orderBy);
    this.app.logger.debug('更新数据纬度接口参数：' + JSON.stringify(params));
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
    // 参数校验
    this.app.logger.debug('valid controller params begin...');
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
    this.app.logger.debug('valid controller params end');
    // 调用service,进行更新操作
    const dataLatitudeResult = await this.ctx.service.dataLatitude.updateDataLatitude(params);
    if (dataLatitudeResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service，获取更新后的数据
    const dataLatitude = await this.ctx.service.dataLatitude.getDataLatitude(params.id);
    this.ctx.body = dataLatitude;
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
