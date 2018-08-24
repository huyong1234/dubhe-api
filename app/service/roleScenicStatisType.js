'use strict';

const Service = require('egg').Service;

class RoleScenicStatisTypeService extends Service {
  // 查询列表
  async getRoleScenicStatisTypeList(params) {
    // 配置校验规则
    const createRule = {
      scenicStatisTypeId: {
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
      scenicStatisTypeId: params.scenicStatisTypeId
    };

    // 查询数据库
    const dbRoleApplyGroup = await this.app.model.RoleScenicStatisType.findAll({
      where: whereSearch
    });

    return dbRoleApplyGroup;
  }

  // 添加
  async addRoleScenicStatisType(params) {
    // 配置校验规则
    const createRule = {
      roleId: {
        type: 'int',
        required: true
      },
      scenicStatisTypeId: {
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
    const dbRoleApplyGroup = await this.app.model.RoleScenicStatisType.create(params);

    return dbRoleApplyGroup;
  }

  // 删除
  async deleteRoleScenicStatisType(param) {
    // 配置校验规则
    const createRule = {
      roleId: {
        type: 'int',
        required: true
      },
      scenicStatisTypeId: {
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
      scenicStatisTypeId: param.scenicStatisTypeId
    };
    const dbRoleApplyGroup = await this.app.model.RoleScenicStatisType.update(
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

module.exports = RoleScenicStatisTypeService;
