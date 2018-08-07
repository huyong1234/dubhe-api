'use strict';

const Service = require('egg').Service;

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
      attributes: ['id', 'contents', 'name', 'modelId', 'orderBy']
    });

    return dbScenicStatis;
  }

  // 查询单个
  async getScenicStatis(id) {
    const ScenicStatis = await this.app.model.ScenicStatis.findById(id, {
      attributes: ['id', 'contents', 'name', 'modelId', 'orderBy']
    });
    return ScenicStatis;
  }

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
    const whereSearch = {
      id: params.id
    };
    const dbScenicStatis = await this.app.model.ScenicStatis.update(params, {
      where: whereSearch
    });
    return dbScenicStatis;
  }

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
