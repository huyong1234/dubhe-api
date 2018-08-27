'use strict';

const Service = require('egg').Service;
// 查询字段
const fields = [
  'id',
  'applyGroupId',
  'name',
  'actionType',
  'action',
  'icon',
  'orderBy',
  'sys_adder',
  'sys_updator',
  'created_at',
  'updated_at'
];

class ApplyService extends Service {
  // 查询列表
  async getApplyList(params) {
    // 配置校验规则
    const rules = {
      limit: {
        required: true,
        type: 'int'
      },
      offSet: {
        required: true,
        type: 'int'
      },
      name: {
        required: false,
        type: 'string'
      },
      actionType: {
        required: false,
        type: 'int'
      },
      id: {
        required: false,
        type: 'int'
      }
    };
    // 参数验证
    const errors = this.app.validator.validate(rules, params);
    // 判断：如果参数验证错误，抛出错误
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
      sys_isDelete: 0
    };
    // 对参数进行判断，拼接查询条件
    if (params.name) {
      whereSearch.name = params.name;
    }
    if (params.actionType || params.actionType === 0) {
      whereSearch.actionType = params.actionType;
    }
    if (params.id) {
      whereSearch.applyGroupId = params.id;
    }
    const apply = await this.app.model.Apply.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      // 排序
      order: ['orderBy'],
      // 查询字段
      attributes: fields
    });
    return apply;
  }
  // 查询对象
  async getApply(id) {
    const apply = await this.app.model.Apply.findById(id, {
      attributes: fields
    });
    return apply;
  }

  // 新建
  async createApply(params) {
    const rules = {
      name: {
        required: true,
        type: 'string'
      },
      applyGroupId: {
        required: true,
        type: 'int'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      actionType: {
        required: true,
        type: 'int'
      },
      icon: {
        required: true,
        type: 'string'
      },
      action: {
        required: true,
        type: 'string'
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
    const apply = await this.app.model.Apply.create(params);
    // 创建返回对象
    const newApply = {
      id: apply.id,
      applyGroupId: apply.applyGroupId,
      name: apply.name,
      actionType: apply.actionType,
      action: apply.action,
      icon: apply.icon,
      orderBy: apply.orderBy,
      sys_adder: apply.sys_adder,
      sys_updator: apply.sys_updator,
      created_at: apply.created_at,
      updated_at: apply.updated_at
    };
    return newApply;
  }
  // 修改
  async updateApply(params) {
    const rules = {
      id: {
        required: true,
        type: 'int'
      },
      name: {
        required: true,
        type: 'string'
      },
      applyGroupId: {
        required: true,
        type: 'int'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      actionType: {
        required: true,
        type: 'int'
      },
      icon: {
        required: true,
        type: 'string'
      },
      action: {
        required: true,
        type: 'string'
      },
      sys_updator: {
        type: 'int',
        required: true
      }
    };
    const errors = this.app.validator.validate(rules, params);
    // 判断：如果参数验证错误，抛出500错误
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
    // 设置where条件
    const whereSearch = {
      id: params.id
    };
    // 数据库更新操作
    const applyGroup = await this.app.model.Apply.update(params, {
      where: whereSearch
    });
    return applyGroup;
  }

  // 删除
  async destroy(param) {
    const apply = await this.app.model.Apply.update(
      // 执行删除操作，并不是物理删除，而是把sys_isDelete的值改为1
      {
        sys_isDelete: 1
      },
      {
        where: {
          id: param
        }
      }
    );
    return apply;
  }

  // 查询数据总量
  async getTotal(applyGroupId) {
    const whereSearch = {
      applyGroupId,
      sys_isDelete: 0
    };
    const total = await this.app.model.Apply.count({
      where: whereSearch
    });
    return total;
  }
}

module.exports = ApplyService;
