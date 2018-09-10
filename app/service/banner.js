'use strict';

const Service = require('egg').Service;
// 查询字段
const fields = [
  'id',
  'companyId',
  'name',
  'imgId',
  'actionType',
  'action',
  'orderBy',
  'sys_adder',
  'sys_updator',
  'created_at',
  'updated_at'
];

class BannerService extends Service {
  // 查询列表
  async getBannerList(params) {
    // 配置校验规则
    const createRule = {
      name: {
        type: 'string',
        required: false
      },
      actionType: {
        type: 'int',
        required: false
      },
      insertTimeStart: {
        type: 'string',
        required: false
      },
      insertTimeEnd: {
        type: 'string',
        required: false
      },
      limit: {
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      },
      companyId: {
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
    // 查询条件
    const whereSearch = {
      sys_isDelete: 0,
      companyId: params.companyId
    };
    // const between = {};
    // 根据参数组装查询条件
    if (params.name) {
      whereSearch.name = params.name;
    }
    if (params.actionType || params.actionType === 0) {
      whereSearch.actionType = params.actionType;
    }
    if (params.insertTimeStart && params.insertTimeEnd) {
      whereSearch.sys_addTime = {
        $gt: params.insertTimeStart,
        $lt: params.insertTimeEnd
      };
    }

    // 查询数据库
    const bannerList = await this.app.model.Banner.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      order: ['orderBy'],
      attributes: fields
    });

    const total = await this.getTotal(whereSearch);
    const banner = {
      bannerList,
      total
    };

    return banner;
  }

  // 根据id查询
  async getBanner(id) {
    const Banner = await this.app.model.Banner.findById(id, {
      attributes: fields
    });
    return Banner;
  }

  // 添加
  async addBanner(params) {
    // 配置校验规则
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      sys_adder: {
        type: 'int',
        required: true
      },
      companyId: {
        type: 'int',
        required: true
      },
      imgId: {
        type: 'string',
        required: true
      },
      action: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      actionType: {
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
    // 操作数据库，新增一条记录
    const dbBanners = await this.app.model.Banner.create(params);
    // 新建返回对象,根据API文档，组装返回对象属性
    const newBanner = {
      id: dbBanners.id,
      companyId: dbBanners.companyId,
      name: dbBanners.name,
      imgId: dbBanners.imgId,
      actionType: dbBanners.actionType,
      action: dbBanners.action,
      orderBy: dbBanners.orderBy,
      sys_adder: dbBanners.sys_adder,
      sys_updator: dbBanners.sys_updator,
      created_at: dbBanners.created_at,
      updated_at: dbBanners.updated_at
    };

    return newBanner;
  }

  // 更新
  async updateBanner(params) {
    const createRule = {
      id: {
        type: 'int',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      sys_updator: {
        type: 'int',
        required: true
      },
      companyId: {
        type: 'int',
        required: true
      },
      imgId: {
        type: 'string',
        required: true
      },
      action: {
        type: 'string',
        required: true
      },
      orderBy: {
        type: 'int',
        required: true
      },
      actionType: {
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
    const whereSearch = {
      id: params.id
    };
    // 操作数据库，进行更新操作
    const dbBanners = await this.app.model.Banner.update(params, {
      where: whereSearch
    });
    return dbBanners;
  }

  // 删除
  async deleteBanner(param) {
    const dbBanners = await this.app.model.Banner.update(
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
    return dbBanners;
  }

  // 查询数据总量
  async getTotal(whereSearch) {
    const total = await this.app.model.Banner.count({
      where: whereSearch
    });
    return total;
  }
}

module.exports = BannerService;
