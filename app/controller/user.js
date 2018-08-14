'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async show() {
    const id = this.ctx.params.id;
    const user = await this.ctx.service.user.getUser(id);
    this.ctx.body = user;
  }
}

module.exports = UserController;
