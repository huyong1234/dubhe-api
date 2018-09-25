'use strict';
const Service = require('egg').Service;
const fields = [
  'id',
  'noticeTypeId',
  'title',
  'contents',
  'status',
  'sys_addTime',
  'sys_updateTime',
  'sys_adder',
  'sys_updator'
];

class NoticeService extends Service {
  // 查询通知列表
  async getNoticeList(params) {
    // 配置参数校验规则
    const createRule = {
      companyId: {
        type: 'int',
        required: true
      },
      offSet: {
        type: 'int',
        required: true
      },
      limit: {
        type: 'int',
        required: true
      },
      partition: {
        type: 'int',
        required: false
      },
      noticeType: {
        type: 'int',
        required: false
      },
      created_at: {
        type: 'string',
        required: false
      },
      updated_at: {
        type: 'string',
        required: false
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
    // 根据公司id查询通知类型id
    const noticeType = await this.app.model.NoticeType.findAll({
      where: {
        sys_isDelete: 0,
        companyId: params.companyId
      }
    });
    // 将通知类型id放入数组，作为查询通知时的条件
    const noticeTypeIdList = [];
    for (const o in noticeType) {
      noticeTypeIdList.push(noticeType[o].id);
    }
    // 根据参数组装查询条件
    const Op = this.app.Sequelize.Op;
    const whereSearch = {
      noticeTypeId: {
        [Op.in]: noticeTypeIdList
      },
      sys_isDelete: 0,
      status: 0 // 未发送
    };
    if (!params.noticeType && (params.partition || params.partition === 0)) {
      // 如果要根据模块进行查询，则需要先根据模块查询模块下的通知类型
      const noticeType = await this.app.model.NoticeType.findAll({
        where: {
          sys_isDelete: 0,
          partition: params.partition
        }
      });
      // 将通知类型id放入数组，作为查询通知时的条件
      const noticeTypeIdList = [];
      for (const o in noticeType) {
        noticeTypeIdList.push(noticeType[o].id);
      }
      whereSearch.noticeTypeId = {
        [Op.in]: noticeTypeIdList
      };
    }
    if (params.noticeType) {
      whereSearch.noticeTypeId = params.noticeType;
    }
    // 根据时间段进行查询
    if (params.created_at && params.updated_at) {
      whereSearch.sys_addTime = {
        $gt: params.created_at,
        $lt: params.updated_at
      };
    }
    // if (params.updated_at) {
    //   // 获取传递时间参数得当天时间，endOf(表示一天最晚的一个时间点)
    //   const updateTime = moment(params.updated_at).endOf('day');
    //   whereSearch.created_at = {
    //     $gt: params.updated_at, // >
    //     $lt: updateTime // <
    //   };
    // }
    // 查询数据库
    const noticeList = await this.app.model.Notice.findAll({
      where: whereSearch,
      limit: params.limit,
      offset: params.offSet,
      attributes: fields,
      // 连表查询
      include: {
        model: this.app.model.NoticeType,
        attributes: ['partition', 'name']
      }
    });
    // 查询当前查询条件下的数据总量
    const total = await this.getTotal(whereSearch);
    const noticeListAndTotal = {
      noticeList,
      total
    };
    return noticeListAndTotal;
  }

  // 查询单条通知
  async getNotice(noticeId) {
    const notice = await this.app.model.Notice.findById(noticeId, {
      attributes: fields
    });
    return notice;
  }

  // 查询未发送数据总量
  async getTotal(whereSearch) {
    const total = await this.app.model.Notice.count({
      where: whereSearch
    });
    return total;
  }

  // 增加一条新的通知
  async addNotice(params) {
    // 配置验证规则
    const createRule = {
      partition: {
        type: 'int',
        required: true
      },
      noticeTypeId: {
        type: 'int',
        required: true
      },
      title: {
        type: 'string',
        required: true
      },
      abstract: {
        type: 'string',
        required: true
      },
      imgId: {
        type: 'string',
        required: false
      },
      substance: {
        type: 'string',
        required: true
      },
      status: {
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
    // 将通知内容相关的字段，都放进一个json数组
    const contentObject = {
      abstract: params.abstract,
      imgId: params.imgId,
      substance: params.substance
    };
    const contents = JSON.stringify(contentObject);
    // 组装新增通知时的参数
    const addParams = {
      noticeTypeId: params.noticeTypeId,
      title: params.title,
      contents,
      status: params.status,
      sys_adder: params.sys_adder
    };
    const notice = await this.app.model.Notice.create(addParams);
    // 组装返回对象
    const result = {
      id: notice.id,
      noticeTypeId: notice.noticeTypeId,
      title: notice.title,
      contents: JSON.parse(notice.contents),
      status: notice.status,
      sys_addTime: notice.created_at,
      sys_updateTime: notice.updated_at,
      sys_adder: notice.sys_adder,
      sys_updator: notice.sys_updator
    };
    return result;
  }

  // 修改通知
  async updateNotice(params) {
    // 配置验证规则
    const createRule = {
      noticeId: {
        type: 'int',
        required: false
      },
      partition: {
        type: 'int',
        required: false
      },
      noticeTypeId: {
        type: 'int',
        required: false
      },
      title: {
        type: 'string',
        required: false
      },
      abstract: {
        type: 'string',
        required: false
      },
      imgId: {
        type: 'string',
        required: false
      },
      substance: {
        type: 'string',
        required: false
      },
      status: {
        type: 'int',
        required: false
      },
      sys_updator: {
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
      id: params.noticeId
    };
    // 如果需要更新通知内容，则需要进行contents的重新封装
    const notice = await this.getNotice(params.noticeId);
    const contentObject = JSON.parse(notice.contents);
    if (params.abstract) {
      contentObject.abstract = params.abstract;
    }
    if (params.imgId) {
      contentObject.imgId = params.imgId;
    }
    if (params.substance) {
      contentObject.substance = params.substance;
    }
    const contents = JSON.stringify(contentObject);
    // 组装更新操作的参数
    const updateParams = {
      noticeTypeId: params.noticeTypeId,
      title: params.title,
      contents,
      status: params.status,
      sys_updator: params.sys_updator
    };
    // 操作数据库，进行更新操作
    const result = await this.app.model.Notice.update(updateParams, {
      where: whereSearch
    });
    return result;
  }

  // 删除通知
  async deleteNotice(noticeId, userId) {
    const notice = await this.app.model.Notice.update(
      {
        sys_isDelete: 1,
        sys_updator: userId
      },
      {
        where: {
          id: noticeId
        }
      }
    );
    return notice;
  }
}

module.exports = NoticeService;
