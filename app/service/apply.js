'use strict';

const Service = require('egg').Service;

class ApplyService extends Service {
  // 查询列表
  async getApplyList(params) {
    // 配置校验规则
    const rules = {
      limit: {
        required: true,
        type: 'integer'
      },
      offSet: {
        required: true,
        type: 'integer'
      },
      name: {
        required: false,
        type: 'string'
      },
      actionType: {
        required: false,
        type: 'integer'
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
    if (params.actionType) {
      whereSearch.actionType = params.actionType;
    }
    const apply = await this.app.model.Apply.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      // 查询字段
      attributes: ['id', 'name', 'icon', 'action', 'oderBy', 'actionType']
    });
    return apply;
  }
  // 查询对象
  async getApply(id) {
    const apply = await this.app.model.Apply.findById(id, {
      attributes: ['id', 'name', 'icon', 'action', 'oderBy', 'actionType', 'sys_addTime', 'sys_updateTime']
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
      oderBy: {
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
    const applyGroup = await this.app.model.Apply.create(params, {
      attributes: ['id', 'name', 'icon', 'action', 'oderBy', 'actionType']
    });
    return applyGroup;
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
      oderBy: {
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
}

module.exports = ApplyService;
