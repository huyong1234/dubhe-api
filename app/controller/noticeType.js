'use strict';

const Controller = require('egg').Controller;

class NoticeTypeController extends Controller {
  async index() {
    // 获取参数
    const companyId = parseInt(this.ctx.request.query.companyId);
    // 日志记录参数信息
    this.app.logger.debug('查询通知类型列表接口参数' + companyId);
    const type = typeof companyId;
    // 简单的参数校验
    if (type !== 'number') {
      this.ctx.throw(400, 'companyId should be an Integer');
    }
    // 调用service
    const noticeTypeList = await this.ctx.service.noticeType.getNoticeTypeList(companyId);
    this.ctx.body = noticeTypeList;
  }
}

module.exports = NoticeTypeController;
