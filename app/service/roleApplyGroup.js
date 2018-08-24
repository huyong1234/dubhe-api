'use strict';

const Service = require('egg').Service;
// 查询字段
// const fields = [
//   'id',
//   'roleId',
//   'applyGroupId',
//   'orderBy',
//   'sys_adder',
//   'sys_updator',
//   'created_at',
//   'updated_at'
// ];

class RoleApplyGroupService extends Service {
  // 查询列表
  async getRoleApplyGroupList(params) {
    // 配置校验规则
    const createRule = {
      applyGroupId: {
        type: 'int',
        required: true
      },
      roleId: {
        type: 'int',
        required: true
      }
    };
    // 参数校验
    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    // 查询条件
    const whereSearch = {
      sys_isDelete: 0,
      roleId: params.roleId,
      applyGroupId: params.applyGroupId
    };

    // 查询数据库
    const dbRoleApplyGroup = await this.app.model.RoleApplyGroup.findAll({
      where: whereSearch
      // attributes: fields
    });

    return dbRoleApplyGroup;
  }

  // 添加
  async addRoleApplyGroup(params) {
    // 配置校验规则
    const createRule = {
      roleId: {
        type: 'int',
        required: true
      },
      applyGroupId: {
        type: 'int',
        required: true
      },
      sys_adder: {
        type: 'int',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      }
    };
    // 参数校验
    const errors = this.app.validator.validate(createRule, params);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    // 操作数据库，新增一条记录
    const dbRoleApplyGroup = await this.app.model.RoleApplyGroup.create(params);

    return dbRoleApplyGroup;
  }

  // 删除
  async deleteRoleApplyGroup(param) {
    // 配置校验规则
    const createRule = {
      roleId: {
        type: 'int',
        required: true
      },
      applyGroupId: {
        type: 'int',
        required: true
      },
      sys_updator: {
        required: true,
        type: 'int'
      }
    };
    // 参数校验
    const errors = this.app.validator.validate(createRule, param);
    if (errors) {
      const messages = [];
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }

    const updateParams = {
      roleId: param.roleId,
      applyGroupId: param.applyGroupId
    };
    const dbRoleApplyGroup = await this.app.model.RoleApplyGroup.update(
      // 执行删除操作，并不是物理删除，而是把sys_isDelete的值改为1
      {
        sys_isDelete: 1,
        sys_updator: param.sys_updator
      },
      {
        where: updateParams
      }
    );
    return dbRoleApplyGroup;
  }
}

module.exports = RoleApplyGroupService;
