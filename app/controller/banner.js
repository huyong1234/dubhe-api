'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {
  // 查询列表接口
  async index() {
    // 获取参数
    const params = this.ctx.request.query;
    // 配置校验规则
    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      actionType: {
        type: 'string',
        required: false
      },
      insertTimeStart: {
        type: 'string',
        required: false
      },
      insertTimeEnd: {
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
    // 参数校验
    this.app.logger.debug('valid params begin...');
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

    this.app.logger.debug('valid params end');
    // 将string类型转为int类型
    if (params.actionType) params.actionType = parseInt(params.actionType);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    // 调用service，获取返回列表
    const banner = await this.ctx.service.banner.getBannerList(params);
    // 调用service，查询总数据条数
    const total = await this.ctx.service.banner.getTotal();
    // 将数据总条数，放入响应头
    this.ctx.response.set('total', total);
    this.ctx.body = banner;
  }

  // 查询单个接口
  async show() {
    // 获取参数
    const id = this.ctx.params.id;
    const banner = await this.ctx.service.banner.getBanner(id);
    this.ctx.body = banner;
  }

  // 新建接口
  async create() {
    // 获取参数
    const params = this.ctx.request.body;
    // 配置验证规则
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      sys_adder: {
        type: 'string',
        required: true
      },
      companyId: {
        type: 'string',
        required: true
      },
      imgId: {
        type: 'string',
        required: true
      },
      action: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'string',
        required: true
      },
      actionType: {
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
    // 将string转为int类型
    params.orderBy = parseInt(params.orderBy);
    params.companyId = parseInt(params.companyId);
    params.actionType = parseInt(params.actionType);
    const banner = await this.ctx.service.banner.addBanner(params);
    // 新建返回对象
    const newBanner = {};
    // 根据API文档，组装返回对象属性
    newBanner.id = banner.id;
    newBanner.name = banner.name;
    newBanner.imgId = banner.imgId;
    newBanner.action = banner.action;
    newBanner.orderBy = banner.orderBy;
    newBanner.actionType = banner.actionType;
    newBanner.sys_addTime = banner.created_at;
    this.ctx.body = newBanner;
  }
  // 修改接口
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
      sys_updator: {
        type: 'string',
        required: true
      },
      companyId: {
        type: 'string',
        required: true
      },
      imgId: {
        type: 'string',
        required: true
      },
      action: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'string',
        required: true
      },
      actionType: {
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
    params.companyId = parseInt(params.companyId);
    params.actionType = parseInt(params.actionType);
    const bannerResult = await this.ctx.service.banner.updateBanner(params);
    if (bannerResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    const banner = await this.ctx.service.banner.getBanner(params.id);
    // 新建返回对象
    const newBanner = {};
    // 根据API文档，组装返回对象属性
    newBanner.id = banner.id;
    newBanner.name = banner.name;
    newBanner.imgId = banner.imgId;
    newBanner.action = banner.action;
    newBanner.orderBy = banner.orderBy;
    newBanner.actionType = banner.actionType;
    newBanner.sys_addTime = banner.created_at;

    this.ctx.body = newBanner;
  }
  // 删除接口
  async destroy() {
    // 获取url参数
    const id = parseInt(this.ctx.params.id);
    const banner = await this.ctx.service.banner.deleteBanner(id);
    if (banner === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = BannerController;
