'use strict';

const Service = require('egg').Service;
const moment = require('moment');
const fields = ['id', 'sys_addTime', 'sys_updateTime', 'sys_adder', 'sys_updator'];
class NoticeHistoryService extends Service {
  // 查询推送历史列表
  async getNoticeHistoryList(params) {
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
    // 封装查询参数
    const whereSearch = {
      sys_isDelete: 0
    };
    const whereSearchHistory = {
      sys_isDelete: 0,
      companyId: params.companyId
    };
    if (params.partition) {
      whereSearch.partition = params.partition;
    }
    if (params.noticeType) {
      whereSearch.noticeType = params.noticeType;
    }
    if (params.updated_at) {
      // 获取传递时间参数得当天时间，endOf(表示一天最晚的一个时间点)
      const updateTime = moment(params.updated_at).endOf('day');
      whereSearchHistory.created_at = {
        $gt: params.updated_at,
        $lt: updateTime
      };
    }
    // 三表连查
    const noticeHistory = await this.app.model.NoticeHistory.findAll({
      where: whereSearchHistory,
      limit: params.limit,
      offSet: params.offSet,
      attributes: fields,
      // 多表连查关键字
      include: [
        {
          model: this.app.model.Notice,
          where: whereSearch,
          attributes: ['id', 'noticeTypeId', 'title', 'contents']
        },
        {
          model: this.app.model.HrmDepartment,
          attributes: ['id', 'departmentname']
        }
      ]
    });
    // groupBy noticeId
    const noticeGroup = await this.app.model.NoticeHistory.findAll({
      where: whereSearchHistory,
      attributes: ['noticeid'],
      group: 'noticeid'
    });
    // 最终结果结合
    const result = [];
    for (const i in noticeGroup) {
      // 部门集合
      const department = [];
      // 新建一个NoticeHistory对象
      let newNoticehistory = {};
      const noticeId = noticeGroup[i].dataValues.noticeid;
      for (const o in noticeHistory) {
        // 根据noticeId进行分组
        if (noticeHistory[o].dataValues.notice.id === noticeId) {
          newNoticehistory = {
            sys_addTime: noticeHistory[o].dataValues.sys_addTime,
            sys_updateTime: noticeHistory[o].dataValues.sys_updateTime,
            sys_adder: noticeHistory[o].dataValues.sys_adder,
            sys_updator: noticeHistory[o].dataValues.sys_updator,
            notice: {
              id: noticeHistory[o].dataValues.notice.id,
              noticeTypeId: noticeHistory[o].dataValues.notice.noticeTypeId,
              title: noticeHistory[o].dataValues.notice.title,
              contents: noticeHistory[o].dataValues.notice.contents
            }
          };
          const newDepartment = {
            id: noticeHistory[o].dataValues.hrmDepartment.id,
            departmentname: noticeHistory[o].hrmDepartment.departmentname
          };
          // 将部门放入部门集合
          department.push(newDepartment);
          newNoticehistory.department = department;
        }
      }
      // 将newNoticehistory对象放入结果集合
      result.push(newNoticehistory);
    }
    return result;
  }

  // 查询推送详情接口
  async getNoticeHistory(noticeId) {
    // 三表连查
    const noticeHistory = await this.app.model.NoticeHistory.findAll({
      where: {
        noticeId,
        sys_isDelete: 0
      },
      attributes: fields,
      include: [
        {
          model: this.app.model.Notice,
          attributes: ['id', 'noticeTypeId', 'title', 'contents']
        },
        {
          model: this.app.model.HrmDepartment,
          attributes: ['id', 'departmentname']
        }
      ]
    });
    const department = [];
    let newNoticehistory = {};
    const temp = {};
    for (const o in noticeHistory) {
      newNoticehistory = {
        sys_addTime: noticeHistory[o].dataValues.sys_addTime,
        sys_updateTime: noticeHistory[o].dataValues.sys_updateTime,
        sys_adder: noticeHistory[o].dataValues.sys_adder,
        sys_updator: noticeHistory[o].dataValues.sys_updator,
        notice: {
          id: noticeHistory[o].dataValues.notice.id,
          noticeTypeId: noticeHistory[o].dataValues.notice.noticeTypeId,
          title: noticeHistory[o].dataValues.notice.title,
          contents: noticeHistory[o].dataValues.notice.contents
        }
      };
      const newDepartment = {
        id: noticeHistory[o].dataValues.hrmDepartment.id,
        departmentname: noticeHistory[o].hrmDepartment.departmentname
      };
      if (temp[newDepartment.id]) continue;
      department.push(newDepartment);
      temp[newDepartment.id] = true;
    }
    newNoticehistory.department = department;
    return newNoticehistory;
  }

  // 添加推送记录，并调用推送接口
  async addNoticeHistory(params) {
    // 配置验证规则
    const createRule = {
      noticeId: {
        type: 'int',
        required: true
      },
      department: {
        type: 'string',
        required: true
      },
      companyId: {
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
    // 将department字符窜转化为数组
    const dempartmentArray = JSON.parse(params.department);
    // 遍历dempartmentArray，往数据库插入数据
    for (let index = 0; index < dempartmentArray.length; index++) {
      params.departmentId = dempartmentArray[index];
      // 插入数据
      const noticeHistory = await this.app.model.NoticeHistory.create(params);
      if (noticeHistory) {
        continue;
      }
    }
    const Op = this.app.Sequelize.Op;
    // 根据部门id，查询部门下的员工信息
    const userInfo = await this.app.model.HrmResource.findAll({
      where: {
        departmentid: {
          [Op.in]: dempartmentArray
        }
      }
    });
    // 将员工手机号放入推送参数中
    const mobileList = [];
    for (const o in userInfo) {
      mobileList.push(userInfo[o].mobile);
    }
    // 根据noticeid获取通知的具体内容
    const notice = await this.app.model.Notice.findById(params.noticeId);
    // 获取推送具体内容
    const contentObject = JSON.parse(notice.contents);
    const substance = contentObject.substance;
    // 封装极光推送接口的参数
    const pushParams = {
      platform: 'all',
      audience: 'all',
      // {
      //   registration_id: mobileList
      // },
      message: {
        content_type: 'text',
        msg_content: substance,
        title: notice.title
      }
    };
    const jsonParams = JSON.stringify(pushParams);
    const sendParams = JSON.parse(jsonParams);
    // 打印推送参数
    this.app.logger.debug(pushParams);
    // 调用推送接口
    const result = await this.ctx.curl(this.app.config.notify.url, {
      method: 'POST',
      headers: this.app.config.notify.headers,
      data: sendParams,
      contentType: 'json',
      dataType: 'json'
    });
    return result.data;
  }
}

module.exports = NoticeHistoryService;
