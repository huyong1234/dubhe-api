'use strict';

const Controller = require('egg').Controller;

class NoticeController extends Controller {
  // 查询通知列表
  async index() {
    // 获取参数
    const params = this.ctx.request.query;
    // 日志记录参数信息
    this.app.logger.debug('查询通知列表接口参数' + params);
    // 配置参数校验规则
    const createRule = {
      companyId: {
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      },
      limit: {
        type: 'int',
        required: true
      },
      partition: {
        type: 'int',
        required: false
      },
      noticeType: {
        type: 'int',
        required: false
      },
      updated_at: {
        type: 'string',
        required: false
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
    // 将int类型转换成string
    params.companyId = parseInt(params.companyId);
    params.limit = parseInt(params.limit);
    params.offSet = parseInt(params.offSet);
    if (params.partition) {
      params.partition = parseInt(params.partition);
    }
    if (params.noticeType) {
      params.noticeType = parseInt(params.noticeType);
    }

    // 调用service，获取返回列表
    const notice = await this.ctx.service.notice.getNoticeList(params);
    // 将数据总条数，放入响应头
    this.ctx.response.set('total', notice.total);
    this.ctx.body = notice.noticeList;
  }

  // 根据id查询一条通知
  async show() {
    const noticeId = this.ctx.params.id;
    const notice = await this.ctx.service.notice.getNotice(noticeId);
    this.ctx.body = notice;
  }

  // 新增通知
  async create() {
    // 获取参数
    const params = this.ctx.request.body;
    // 配置验证规则
    const createRule = {
      partition: {
        type: 'int',
        required: true
      },
      noticeTypeId: {
        type: 'int',
        required: true
      },
      title: {
        type: 'string',
        required: true
      },
      abstract: {
        type: 'string',
        required: true
      },
      imgId: {
        type: 'string',
        required: true
      },
      substance: {
        type: 'string',
        required: true
      },
      status: {
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
    // 将string转为int类型
    params.sys_adder = parseInt(params.sys_adder);
    params.partition = parseInt(params.partition);
    params.noticeTypeId = parseInt(params.noticeTypeId);
    params.status = parseInt(params.status);
    const notice = await this.ctx.service.notice.addNotice(params);
    this.ctx.body = notice;
  }

  // 修改通知
  async update() {
    // 获取query参数
    const noticeId = this.ctx.params.id;
    // 获取formbody参数
    const params = this.ctx.request.body;
    // 配置验证规则
    const createRule = {
      partition: {
        type: 'int',
        required: false
      },
      noticeTypeId: {
        type: 'int',
        required: false
      },
      title: {
        type: 'string',
        required: false
      },
      abstract: {
        type: 'string',
        required: false
      },
      imgId: {
        type: 'string',
        required: false
      },
      substance: {
        type: 'string',
        required: false
      },
      status: {
        type: 'int',
        required: false
      },
      sys_updator: {
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
    // 将string转为int类型
    params.sys_updator = parseInt(params.sys_updator);
    if (params.partition) {
      params.partition = parseInt(params.partition);
    }
    if (params.noticeTypeId) {
      params.noticeTypeId = parseInt(params.noticeTypeId);
    }
    if (params.status) {
      params.status = parseInt(params.status);
    }
    params.noticeId = noticeId;
    const result = await this.ctx.service.notice.updateNotice(params);
    // 判断是否更新成功
    if (result[0] === 0) {
      this.ctx.throw('数据更新失败');
    }
    const notice = await this.ctx.service.notice.getNotice(noticeId);
    this.ctx.body = notice;
  }

  // 删除通知
  async destroy() {
    const noticeId = this.ctx.params.id;
    const sys_updator = this.ctx.request.query.userId;
    const result = await this.ctx.service.notice.deleteNotice(noticeId, sys_updator);
    if (result === 0) {
      this.ctx.throw('数据删除失败');
    }
    this.ctx.body = null;
  }
}

module.exports = NoticeController;
