'use strict';

const Service = require('egg').Service;

class ApplyGroupService extends Service {
  // 查询列表
  async getApplyGroupList(params) {
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
    const applyGroup = await this.app.model.ApplyGroup.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      attributes: ['id', 'name', 'orderBy']
    });
    return applyGroup;
  }

  // 返回applyGroup对象
  async getApplyGroup(id) {
    const applyGroup = await this.app.model.ApplyGroup.findById(id, {
      attributes: ['id', 'name', 'orderBy', 'sys_addTime', 'sys_updateTime']
    });
    return applyGroup;
  }

  // 新建
  async createApplyGroup(params) {
    const rules = {
      name: {
        required: true,
        type: 'string'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      companyId: {
        required: true,
        type: 'int'
      },
      sys_adder: {
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
    const applyGroup = await this.app.model.ApplyGroup.create(params);
    return applyGroup;
  }
  // 修改
  async update(params) {
    const rules = {
      id: {
        required: true,
        type: 'int'
      },
      name: {
        required: true,
        type: 'string'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      sys_updator: {
        type: 'string',
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
    const applyGroup = await this.app.model.ApplyGroup.update(params, {
      where: whereSearch
    });
    return applyGroup;
  }

  // 删除
  async destroy(param) {
    const applyGroup = await this.app.model.ApplyGroup.update(
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
    return applyGroup;
  }
}

module.exports = ApplyGroupService;
