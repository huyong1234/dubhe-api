'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  async echo() {
    // 获取参数
    const companyId = this.ctx.params.subCompanyId;
    // 调用java接口
    const department = await this.ctx.curl(this.app.config.department.host + `?subCompanyId=${companyId}`, {
      headers: this.app.config.department.headers
    });
    // curl方法返回的是buffer对象，需要转换成json对象
    const info = JSON.parse(department.data);
    // 若info的长度等于0，则表示部门列表为空
    if (info.length > 0) {
      this.ctx.body = info;
    } else {
      // 如果该公司id下部门为空，则返回null
      this.ctx.body = null;
    }
  }
}

module.exports = DepartmentController;
