'use strict';

const Service = require('egg').Service;

class ScenicService extends Service {
  async getscenicList() {
    const scenicList = await this.app.model.Scenic.findAll();
    return scenicList;
  }
}

module.exports = ScenicService;
