'use strict';

const Service = require('egg').Service;

class BannerService extends Service {
  async getBannerList(params) {
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
        type: 'dateTime',
        required: false
      },
      insertTimeEnd: {
        type: 'dateTime',
        required: false
      },
      limit: {
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      }
    };
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
    let whereSearch;
    if (params.name) {
      whereSearch = {
        sys_isDelete: 0,
        name: params.name
      };
    }
    if (params.actionType) {
      whereSearch = {
        sys_isDelete: 0,
        actionType: +params.actionType
      };
    }
    if (params.insertTimeStart) {
      whereSearch = {
        sys_isDelete: 0,
        insertTimeStart: params.insertTimeStart
      };
    }
    if (params.insertTimeEnd) {
      whereSearch = {
        sys_isDelete: 0,
        insertTimeEnd: params.insertTimeEnd
      };
    }
    const dbBanners = await this.app.model.Banner.findAll({
      where: whereSearch,
      limit: params.limit,
      offSet: params.offSet,
      attributes: [
        'id',
        'name',
        'imgId',
        'action',
        'orderBy',
        'actionType',
        'sys_addTime'
      ]
    });

    return dbBanners;
  }

  async getBanner(id) {
    const Banner = await this.app.model.Banner.findById(id);
    return Banner;
  }

  async addBanner(params) {
    const createRule = {
      name: {
        type: 'string',
        required: true
      },
      sys_updator: {
        type: 'string',
        required: true
      },
      companyId: {
        type: 'string',
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
    const dbBanners = await this.app.model.Banner.create(params);

    return dbBanners;
  }

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
      companyId: {
        type: 'string',
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
    const dbBanners = await this.app.model.Banner.update(params, {
      where: whereSearch
    });
    return dbBanners;
  }

  async deleteBanner(param) {
    const dbBanners = await this.app.model.Banner.update(
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
}

module.exports = BannerService;
