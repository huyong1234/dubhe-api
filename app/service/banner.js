'use strict';

const Service = require('egg').Service;

class BannerService extends Service {
  async getBanners() {
    const where = {
      isDeleted: 0
    };
    const dbBanners = await this.app.model.Banner.findAll(where);
    return dbBanners;
  }
}

module.exports = BannerService;
