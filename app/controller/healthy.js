'use strict';

const Controller = require('egg').Controller;

class HealthyController extends Controller {
  async getHealthy() {
    this.ctx.status = 200;
    this.ctx.body = 'OK';
  }
  async getReady() {
    this.ctx.status = 200;
    this.ctx.body = 'OK';
  }
}

module.exports = HealthyController;
