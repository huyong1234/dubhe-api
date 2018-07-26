'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {
  async getBanners() {
    const banners = await this.ctx.service.banner.getBanners();

    this.ctx.body = banners;
  }
}

module.exports = BannerController;
