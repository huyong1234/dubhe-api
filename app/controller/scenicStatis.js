'use strict';

const Controller = require('egg').Controller;

class ScenicStatisController extends Controller {
  // 查询列表接口
  async index() {
    const param = this.ctx.request.query;
    if (param.id) {
      param.id = parseInt(param.id);
    }
    const createRule = {
      id: {
        type: 'int',
        required: false
      }
    };
    // 参数验证
    const errors = this.app.validator.validate(createRule, param);
    // 抛出错误异常
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    // 调用service,查询
    const scenicStatis = await this.ctx.service.scenicStatis.getScenicStatisList(param);
    this.ctx.body = scenicStatis;
  }

  // 查询单个接口
  async show() {
    const id = this.ctx.params.id;
    // 调用service,根据id查询
    const scenicStatis = await this.ctx.service.scenicStatis.getScenicStatis(id);
    this.ctx.body = scenicStatis;
  }

  // 新增接口
  async create() {
    // 获取参数
    const params = this.ctx.request.body;
    // 将string转为int类型
    params.sys_adder = parseInt(params.sys_adder);
    params.orderBy = parseInt(params.orderBy);
    params.modelId = parseInt(params.modelId);
    params.scenicStatisTypeId = parseInt(params.scenicStatisTypeId);
    // 参数校验规则
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      modelId: {
        type: 'int',
        required: true
      },
      scenicStatisTypeId: {
        type: 'int',
        required: true
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
    const scenicStatis = await this.ctx.service.scenicStatis.addScenicStatis(params);
    this.ctx.body = scenicStatis;
  }

  // 更新接口
  async update() {
    // 获取url参数
    const id = this.ctx.params.id;
    // 获取formBody参数
    const params = this.ctx.request.body;
    params.id = id;
    params.id = parseInt(params.id);
    params.orderBy = parseInt(params.orderBy);
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
      modelId: {
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
    // 调用service，更新数据
    const result = await this.ctx.service.scenicStatis.updateScenicStatis(params);
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service，获取更新后的数据
    const scenicStatis = await this.ctx.service.scenicStatis.getScenicStatis(id);
    this.ctx.body = scenicStatis;
  }

  // 删除接口
  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const scenicStatis = await this.ctx.service.scenicStatis.deleteScenicStatis(id);
    if (scenicStatis === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = ScenicStatisController;
