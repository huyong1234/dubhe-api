'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {
  async index() {
    const params = this.ctx.request.query;

    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      actionType: {
        type: 'integer',
        required: false
      },
      insertTimeStart: {
        type: 'dateTime',
        required: false
      },
      insertTimeEnd: {
        type: 'dateTime',
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
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    // params.actionType = parseInt(params.actionType);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    const banner = await this.ctx.service.banner.getBannerList(params);
    this.ctx.body = banner;
  }

  async show() {
    const id = this.ctx.params.id;
    const banner = await this.ctx.service.banner.getBanner(id);
    const newBanner = {};
    newBanner.id = banner.id;
    newBanner.name = banner.name;
    newBanner.imgId = banner.imgId;
    newBanner.action = banner.action;
    newBanner.orderBy = banner.orderBy;
    newBanner.actionType = banner.actionType;
    newBanner.sys_addTime = banner.created_at;
    this.ctx.body = newBanner;
  }

  async create() {
    const params = this.ctx.request.body;
    const createRule = {
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
    params.actionType = parseInt(params.actionType);
    const banner = await this.ctx.service.banner.addBanner(params);
    const newBanner = {};
    newBanner.id = banner.id;
    newBanner.name = banner.name;
    newBanner.imgId = banner.imgId;
    newBanner.action = banner.action;
    newBanner.orderBy = banner.orderBy;
    newBanner.actionType = banner.actionType;
    newBanner.sys_addTime = banner.created_at;
    this.ctx.body = newBanner;
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
    params.actionType = parseInt(params.actionType);
    const bannerResult = await this.ctx.service.banner.updateBanner(params);
    if (bannerResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    const banner = await this.ctx.service.banner.getBanner(params.id);

    const newBanner = {};
    newBanner.id = banner.id;
    newBanner.name = banner.name;
    newBanner.imgId = banner.imgId;
    newBanner.action = banner.action;
    newBanner.orderBy = banner.orderBy;
    newBanner.actionType = banner.actionType;
    newBanner.sys_addTime = banner.created_at;

    this.ctx.body = newBanner;
  }

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
