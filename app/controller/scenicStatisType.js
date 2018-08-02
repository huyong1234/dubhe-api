'use strict';

const Controller = require('egg').Controller;

class ScenicStatisTypeController extends Controller {
  // 查询列表接口
  async index() {
    // 获取查询参数
    const params = this.ctx.request.query;
    // 配置校验规则
    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      limit: {
        type: 'string',
        required: true
      },
      offSet: {
        type: 'string',
        required: true
      }
    };
    // 校验参数
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
    // params.actionType = parseInt(params.actionType);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    // 调用service
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisTypeList(params);
    this.ctx.body = scenicStatisType;
  }

  // 查询单个接口
  async show() {
    const id = this.ctx.params.id;
    // 调用service，根据id查询
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    // 新建返回对象
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
  }

  // 新建接口
  async create() {
    // 获取formBody参数
    const params = this.ctx.request.body;
    // 配置校验规则
    const rules = {
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
      icon: {
        type: 'string',
        required: true
      },
      subName: {
        type: 'string',
        required: true
      }
    };

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
    params.orderBy = parseInt(params.orderBy);
    // 调用service，添加数据
    const scenicStatisType = await this.ctx.service.scenicStatisType.addScenicStatisType(params);
    // 新建返回对象
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
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
      icon: {
        type: 'string',
        required: true
      },
      subName: {
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
    // 调用service,更新数据
    const result = await this.ctx.service.scenicStatisType.updateScenicStatisType(params);
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service,获取更新后的数据
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    // 新建返回对象
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
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
