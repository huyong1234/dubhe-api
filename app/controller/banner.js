'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {
  // 查询列表接口
  async index() {
    // 获取参数
    const params = this.ctx.request.query;
    this.app.logger.debug('获取banner列表接口参数：' + params);
    // 将string类型转为int类型
    if (params.actionType) params.actionType = parseInt(params.actionType);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    params.companyId = parseInt(params.companyId);

    // 配置校验规则
    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      actionType: {
        type: 'int',
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
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      },
      companyId: {
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
    // 调用service，获取返回列表
    const banner = await this.ctx.service.banner.getBannerList(params);
    // 将数据总条数，放入响应头
    this.ctx.response.set('total', banner.total);
    this.ctx.body = banner.bannerList;
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
    this.app.logger.debug('新建banner接口参数：' + JSON.stringify(params));
    // 将string转为int类型
    params.sys_adder = parseInt(params.sys_adder);
    params.orderBy = parseInt(params.orderBy);
    params.companyId = parseInt(params.companyId);
    params.actionType = parseInt(params.actionType);
    // 配置验证规则
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      sys_adder: {
        type: 'int',
        required: true
      },
      companyId: {
        type: 'int',
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
        type: 'int',
        required: true
      },
      actionType: {
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
    const banner = await this.ctx.service.banner.addBanner(params);
    this.ctx.body = banner;
  }
  // 修改接口
  async update() {
    // 获取url参数
    const id = this.ctx.params.id;
    // 获取formBody参数
    const params = this.ctx.request.body;
    params.id = id;
    params.id = parseInt(params.id);
    params.sys_updator = parseInt(params.sys_updator);
    params.orderBy = parseInt(params.orderBy);
    params.companyId = parseInt(params.companyId);
    params.actionType = parseInt(params.actionType);
    this.app.logger.debug('修改banner接口参数：' + JSON.stringify(params));
    const createRule = {
      id: {
        type: 'int',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      sys_updator: {
        type: 'int',
        required: true
      },
      companyId: {
        type: 'int',
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
        type: 'int',
        required: true
      },
      actionType: {
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
    const bannerResult = await this.ctx.service.banner.updateBanner(params);
    if (bannerResult[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    this.app.logger.debug('valid controller params end');
    const banner = await this.ctx.service.banner.getBanner(params.id);

    this.ctx.body = banner;
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
