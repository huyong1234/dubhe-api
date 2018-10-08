'use strict';

const Controller = require('egg').Controller;

class ScenicStatisTypeController extends Controller {
  // 查询列表接口
  async index() {
    // 获取查询参数
    const params = this.ctx.request.query;
    this.app.logger.debug('查询数据分组接口参数' + JSON.stringify(params));
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    if (params.scenicId) {
      params.scenicId = parseInt(params.scenicId);
    }
    // 配置校验规则
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
    // 校验参数
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
    // 调用service，获取数据列表
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisTypeList(params);
    // 将数据总条数，放入响应头
    this.ctx.response.set('total', scenicStatisType.total);
    this.ctx.body = scenicStatisType.dbScenicStatisTypes;
  }

  // 查询单个接口
  async show() {
    const id = this.ctx.params.id;
    // 调用service，根据id查询
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    this.ctx.body = scenicStatisType;
  }

  // 新建接口
  async create() {
    // 获取formBody参数
    const params = this.ctx.request.body;
    this.app.logger.debug('新建数据分组接口参数' + JSON.stringify(params));
    params.scenicId = parseInt(params.scenicId);
    params.parentId = parseInt(params.parentId);
    params.sys_adder = parseInt(params.sys_adder);
    params.orderBy = parseInt(params.orderBy);
    // 配置校验规则
    const rules = {
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
      icon: {
        type: 'string',
        required: true
      },
      subName: {
        type: 'string',
        required: false
      },
      sys_adder: {
        required: true,
        type: 'int'
      }
    };
    // 参数校验
    this.app.logger.debug('valid controller params begin...');
    const errors = this.app.validator.validate(rules, params);
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
    // 调用service，添加数据
    const scenicStatisType = await this.ctx.service.scenicStatisType.addScenicStatisType(params);
    this.ctx.body = scenicStatisType;
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
    this.app.logger.debug('更新数据分组接口参数' + JSON.stringify(params));
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
    params.id = parseInt(params.id);
    params.sys_updator = parseInt(params.sys_updator);
    params.orderBy = parseInt(params.orderBy);
    // 调用service,更新数据
    const result = await this.ctx.service.scenicStatisType.updateScenicStatisType(params);
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service,获取更新后的数据
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    this.ctx.body = scenicStatisType;
  }

  // 删除接口
  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const scenicStatisType = await this.ctx.service.scenicStatisType.deleteScenicStatisType(id);
    if (scenicStatisType === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = ScenicStatisTypeController;
