'use strict';

const Controller = require('egg').Controller;

class NoticeHistoryController extends Controller {
  // 查询列表
  async index() {
    // 获取参数
    const params = this.ctx.request.query;
    // 日志记录参数信息
    this.app.logger.debug('查询通知历史列表接口参数' + params);
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
    // 调用service
    const noticeHistory = await this.ctx.service.noticeHistory.getNoticeHistoryList(params);
    this.ctx.body = noticeHistory;
  }

  // 查询推送详情
  async show() {
    // 获取参数
    const noticeId = this.ctx.params.id;
    const noticeHistory = await this.ctx.service.noticeHistory.getNoticeHistory(noticeId);
    this.ctx.body = noticeHistory;
  }

  // 添加接口
  async create() {
    // 获取参数
    const params = this.ctx.request.body;
    this.app.logger.debug('添加发送通知历史接口参数：' + params);
    // 配置验证规则
    const createRule = {
      noticeId: {
        type: 'int',
        required: true
      },
      department: {
        type: 'string',
        required: true
      },
      companyId: {
        type: 'int',
        required: true
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
    params.noticeId = parseInt(params.noticeId);
    params.companyId = parseInt(params.companyId);
    params.sys_adder = parseInt(params.sys_adder);
    const noticeHistory = await this.ctx.service.noticeHistory.addNoticeHistory(params);
    this.ctx.body = noticeHistory;
  }
}

module.exports = NoticeHistoryController;
