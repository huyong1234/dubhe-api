'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 跟去SSOID查询用户信息
  async getUser(ssoid) {
    const user = await this.app.model.Users.findAll({
      where: {
        SSOID: ssoid
      }
    });
    if (!user) {
      this.ctx.throw(new Error('用户不存在'));
    }
    // 根据subCompanyId获取公司信息
    const subCompany = await this.ctx.service.subCompany.getSubCompany(user[0].companyId);
    // 根据departmentid获取部门信息
    const department = await this.ctx.service.department.getDepartment(user[0].departmentid);
    // 根据jobtitle获取职位信息
    const jobTitle = await this.ctx.service.jobTitles.getJobTitle(user[0].jobtitle);
    // 新建返回对象
    const newUser = {
      id: user[0].id,
      lastname: user[0].lastname,
      resourceimageid: user[0].resourceimageid,
      companyId: user[0].companyId,
      companyname: subCompany.subcompanyname,
      departmentId: user[0].departmentid,
      departmentname: department.departmentname,
      jobtitleId: user[0].jobtitle,
      jobtitlename: jobTitle.jobtitlename,
      mobile: user[0].mobile,
      email: user[0].email,
      telephone: user[0].telephone
    };
    return newUser;
  }
}

module.exports = UserService;
