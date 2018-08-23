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
    const whereSearchRoleApply = {
      sys_isDelete: 0,
      roleId: id
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
      roleId: {
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
      applyGroupOrderBy: {
        required: true,
        type: 'int'
      },
      sys_adder: {
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

    // 组装新建roleApply的参数
    const applyParam = {};
    // applyParam.sys_adder = params.userId;
    applyParam.roleId = params.roleId;
    applyParam.applyId = params.applyId;
    applyParam.orderBy = params.applyOrderBy;
    applyParam.sys_adder = params.sys_adder;

    // 新增一条roleApply数据
    const roleApply = await this.app.model.RoleApply.create(applyParam);


    // 创建返回对象
    const result = {};
    result.roleId = roleApply.roleId;
    result.applyId = roleApply.applyId;
    result.sys_adder = roleApply.sys_adder;
    result.applyOrderBy = roleApply.orderBy;
    result.applyGroupId = params.applyGroupId;
    result.applyGroupOderBy = params.applyGroupOrderBy;

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
      },
      sys_updator: {
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
    const whereSearch = {
      roleId: params.roleId,
      applyId: params.applyId
    };
    const result = await this.app.model.RoleApply.update({
      sys_isDelete: 1,
      sys_updator: params.sys_updator
    }, {
      where: whereSearch
    });
    return result;
  }
}

module.exports = RoleApplyService;
