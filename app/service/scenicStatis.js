'use strict';

const Service = require('egg').Service;
// 查询字段
const fields = [
  'id',
  'scenicStatisTypeId',
  'name',
  'contents',
  'modelId',
  'orderBy',
  'sys_adder',
  'sys_updator',
  'created_at',
  'updated_at'
];

class ScenicStatisService extends Service {
  // 查询列表
  async getScenicStatisList(param) {
    const createRule = {
      id: {
        type: 'int',
        required: false
      }
    };
    // 参数验证
    const errors = this.app.validator.validate(createRule, param);
    // 抛出错误异常
    if (errors) {
      const messages = [];
      // 组装错误信息
      for (const index in errors) {
        const message = errors[index].field + ' is ' + errors[index].message;
        messages.push(message);
      }
      const err = JSON.stringify(messages);
      this.ctx.throw(400, err);
    }
    const whereSearch = {
      sys_isDelete: 0
    };
    // 根据参数组装查询条件
    if (param.id) {
      whereSearch.scenicStatisTypeId = param.id;
    }
    const dbScenicStatis = await this.app.model.ScenicStatis.findAll({
      where: whereSearch,
      order: ['orderBy'],
      attributes: fields
    });

    return dbScenicStatis;
  }

  // 查询单个
  async getScenicStatis(id) {
    const ScenicStatis = await this.app.model.ScenicStatis.findById(id, {
      attributes: fields
    });
    return ScenicStatis;
  }

  // 新增数据
  async addScenicStatis(params) {
    // 参数校验规则
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      modelId: {
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
      }
    };

    // 参数校验
    this.app.logger.debug('valid service params begin...');
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
    this.app.logger.debug('valid service params end');
    const dbScenicStatis = await this.app.model.ScenicStatis.create(params);
    // 新建返回对象
    const scenicStatis = {
      id: dbScenicStatis.id,
      scenicStatisTypeId: dbScenicStatis.scenicStatisTypeId,
      modelId: dbScenicStatis.modelId,
      name: dbScenicStatis.name,
      orderBy: dbScenicStatis.orderBy,
      sys_addTime: dbScenicStatis.sys_addTime,
      sys_adder: dbScenicStatis.sys_adder
    };
    return scenicStatis;
  }

  // 更新数据
  async updateScenicStatis(params) {
    const createRule = {
      id: {
        type: 'int',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      modelId: {
        type: 'string',
        required: true
      }
    };
    // 参数校验
    this.app.logger.debug('valid service params begin...');
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
    this.app.logger.debug('valid service params end');
    const whereSearch = {
      id: params.id
    };
    const dbScenicStatis = await this.app.model.ScenicStatis.update(params, {
      where: whereSearch
    });
    return dbScenicStatis;
  }

  // 删除接口
  async deleteScenicStatis(param) {
    const dbScenicStatis = await this.app.model.ScenicStatis.update(
      {
        sys_isDelete: 1
      },
      {
        where: {
          id: param
        }
      }
    );
    return dbScenicStatis;
  }
}

module.exports = ScenicStatisService;
