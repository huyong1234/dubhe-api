'use strict';

const Controller = require('egg').Controller;

class ScenicStatisController extends Controller {
  // 查询列表接口
  async index() {
    const param = this.ctx.request.query;
    const createRule = {
      id: {
        type: 'string',
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
    if (param.id) {
      param.id = parseInt(param.id);
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
    // 新建返回对象
    const newScenicStatis = {};
    newScenicStatis.id = scenicStatis.id;
    newScenicStatis.contents = scenicStatis.contents;
    newScenicStatis.name = scenicStatis.name;
    // newScenicStatis.orderBy = scenicStatis.orderBy;
    newScenicStatis.modelId = scenicStatis.modelId;
    this.ctx.body = newScenicStatis;
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
      // orderBy: {
      //   type: 'string',
      //   required: true
      // },
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
    params.oderBy = parseInt(params.oderBy);
    // 调用service，更新数据
    const result = await this.ctx.service.scenicStatis.updateScenicStatis(params);
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    // 调用service，获取更新后的数据
    const scenicStatis = await this.ctx.service.scenicStatis.getScenicStatis(id);
    // 新建返回对象
    const newScenicStatis = {};
    newScenicStatis.id = scenicStatis.id;
    newScenicStatis.contents = scenicStatis.contents;
    newScenicStatis.name = scenicStatis.name;
    // newScenicStatis.orderBy = scenicStatis.orderBy;
    newScenicStatis.modelId = scenicStatis.modelId;
    this.ctx.body = newScenicStatis;
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
