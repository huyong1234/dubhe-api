'use strict';

const Controller = require('egg').Controller;

class ScenicStatisTypeController extends Controller {
  async index() {
    const params = this.ctx.request.query;

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
    // params.actionType = parseInt(params.actionType);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisTypeList(params);
    this.ctx.body = scenicStatisType;
  }

  async show() {
    const id = this.ctx.params.id;
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
  }

  async create() {
    const params = this.ctx.request.body;
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
    const scenicStatisType = await this.ctx.service.scenicStatisType.addScenicStatisType(params);
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
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
        const message = errors[index].field + 'is' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    params.orderBy = parseInt(params.orderBy);
    const result = await this.ctx.service.scenicStatisType.updateScenicStatisType(params);
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    const scenicStatisType = await this.ctx.service.scenicStatisType.getScenicStatisType(id);
    const newScenicStatisType = {};
    newScenicStatisType.id = scenicStatisType.id;
    newScenicStatisType.name = scenicStatisType.name;
    newScenicStatisType.orderBy = scenicStatisType.orderBy;
    newScenicStatisType.icon = scenicStatisType.icon;
    this.ctx.body = newScenicStatisType;
  }

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
