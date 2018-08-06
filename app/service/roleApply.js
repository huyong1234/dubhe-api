'use strict';

const Service = require('egg').Service;

class RoleApplyService extends Service {
  // 查询列表
  async getRoleApplyList(id) {
    // 创建返回列表
    const roleApplyList = [];
    const type = typeof id;
    // 判断：如果参数验证错误，抛出错误
    if (type !== 'number') {
      this.ctx.throw('id should be an INTEGER');
    }
    // 查询条件
    const whereSearchRoleUser = {
      sys_isDelete: 0,
      userId: id
    };
    // 根据用户id，查询角色id
    const roleUser = await this.app.model.RoleUser.findAll({
      where: whereSearchRoleUser,
      attributes: ['userId', 'roleId']
    });
    const roleid = roleUser[0].roleId;
    // 查询条件
    const whereSearchRoleApply = {
      sys_isDelete: 0,
      roleId: roleid
    };
    // 按roleId查询RoleApply表
    const roleApplies = await this.app.model.RoleApply.findAll({
      where: whereSearchRoleApply,
      attributes: ['applyId', 'roleId', 'orderBy']
    });

    // 遍历roleApply
    for (const o in roleApplies) {
      // 创建roleApply对象
      const roleApply = {};
      roleApply.applyId = roleApplies[o].applyId;
      roleApply.roleId = roleApplies[o].roleId;
      roleApply.orderBy = roleApplies[o].orderBy;
      // 根据applyId查询apply表
      const apply = await this.app.model.Apply.findById(roleApplies[o].applyId, {
        attributes: ['id', 'name', 'icon', 'applyGroupId']
      });
      roleApply.applyName = apply.name;
      roleApply.applyIcon = apply.icon;
      roleApply.applyGroupId = apply.applyGroupId;
      // 根据applyGroupId查询applyGroup表
      const applyGroup = await this.app.model.ApplyGroup.findById(apply.applyGroupId, {
        attributes: ['id', 'name', 'orderBy']
      });
      roleApply.applyGroupName = applyGroup.name;
      roleApply.applyGroupOrderBy = applyGroup.orderBy;

      // 将roleApply对象放入roleApplyList
      roleApplyList.push(roleApply);
    }

    // 组装接口返回列表
    return roleApplyList;
  }

  // 新建
  async createRoleApply(params) {
    const rules = {
      userId: {
        required: true,
        type: 'int'
      },
      applyId: {
        required: true,
        type: 'int'
      },
      applyOrderBy: {
        required: true,
        type: 'int'
      },
      applyGroupId: {
        required: true,
        type: 'int'
      },
      applyGroupOderBy: {
        required: true,
        type: 'int'
      }
    };
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(err);
    }
    const whereSearch = {
      userId: params.userId
    };
    // 根据用户id，查询角色id
    const roleUser = await this.app.model.RoleUser.findAll({
      where: whereSearch,
      attributes: ['userId', 'roleId']
    });

    // 组装新建roleApply的参数
    const applyParam = {};
    applyParam.sys_adder = params.userId;
    applyParam.roleId = roleUser[0].roleId;
    applyParam.applyId = params.applyId;
    applyParam.orderBy = params.applyOrderBy;

    // 新增一条roleApply数据
    const roleApply = await this.app.model.RoleApply.create(applyParam);


    // 创建返回对象
    const result = {};
    result.roleId = roleApply.roleId;
    result.applyId = roleApply.applyId;
    result.applyOrderBy = roleApply.orderBy;
    result.applyGroupId = params.applyGroupId;
    result.applyGroupOderBy = params.applyGroupOderBy;

    return result;
  }

  // 删除
  async destroy(params) {
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      applyId: {
        required: true,
        type: 'int'
      }
    };
    // 参数校验
    const errors = this.app.validator.validate(rules, params);
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(err);
    }
    const result = await this.app.model.RoleApply.update({
      sys_isDelete: 1
    }, {
      where: params
    });
    return result;
  }
}

module.exports = RoleApplyService;
