'use strict';

const Controller = require('egg').Controller;

class ScenicController extends Controller {
  // 查询景区列表
  async index() {
    const scenicList = await this.ctx.service.scenic.getscenicList();
    this.ctx.body = scenicList;
  }
}

module.exports = ScenicController;
