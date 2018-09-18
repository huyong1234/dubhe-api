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
    // 引入sequelize插件中的Op函数
    const Op = this.app.Sequelize.Op;
    // 封装查询参数
    const whereSearch = {
      sys_isDelete: 0
    };
    const whereSearchHistory = {
      sys_isDelete: 0,
      companyId: params.companyId
    };
    // 如果只传partition没有传noticeType，则需要先根据partition查询所有的noticeTypeId
    // partition=0或者partition=''转换成布尔值都是false
    if (!params.noticeType && (params.partition || params.partition === 0)) {
      const noticeType = await this.app.model.NoticeType.findAll({
        where: {
          sys_isDelete: 0,
          partition: params.partition
        }
      });
      const noticeTypeIdList = [];
      for (const o in noticeType) {
        const noticeTypeId = noticeType[o].id;
        noticeTypeIdList.push(noticeTypeId);
      }
      whereSearch.noticeTypeId = {
        [Op.in]: noticeTypeIdList
      };
    }
    // 如果传了noticeType，则直接根据noticeType进行查询
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
    // 三表连查
    const noticeHistoryList = await this.app.model.NoticeHistory.findAll({
      where: whereSearchHistory,
      limit: params.limit,
      offSet: params.offSet,
      attributes: fields,
      // 多表连查关键字
      include: [
        {
          model: this.app.model.Notice,
          where: whereSearch,
          attributes: ['id', 'noticeTypeId', 'title', 'contents'],
          // 关联外键
          include: [
            {
              model: this.app.model.NoticeType,
              attributes: ['partition']
            }
          ]
        },
        {
          model: this.app.model.HrmDepartment,
          attributes: ['id', 'departmentname']
        }
      ]
    });
    // 最终结果结合
    let result = [];
    // noticeId集合
    const noticeIdList = {};
    const temp = {};
    // 对查询结果进行分组，组装
    for (let index = 0; index < noticeHistoryList.length; index++) {
      const noticeHistory = noticeHistoryList[index];
      // 三元运算，进行判断分组
      noticeIdList[noticeHistory.notice.id] ||
        (noticeIdList[noticeHistory.notice.id] = Object.assign({}, noticeHistory.dataValues, { department: [] })); // 使用Object.assign()进行分组
      // department去重
      if (temp[noticeHistory.hrmDepartment.id]) continue;
      noticeIdList[noticeHistory.notice.id].department.push(noticeHistory.hrmDepartment);
      temp[noticeHistory.hrmDepartment.id] = true;
    }
    // 将对象转为数组
    result = Object.values(noticeIdList);
    // 去除对象多余属性——hrmDepartment
    for (const o in result) {
      // 把partition属性放在外层
      result[o].notice.dataValues.partition = result[o].notice.noticeType.partition;
      delete result[o].notice.dataValues.noticeType;
      delete result[o].hrmDepartment;
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
          attributes: ['id', 'noticeTypeId', 'title', 'contents'],
          include: [
            {
              model: this.app.model.NoticeType,
              attributes: ['partition']
            }
          ]
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
    // 这里的for寻获逻辑和查询列表时一样
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
          contents: noticeHistory[o].dataValues.notice.contents,
          partition: noticeHistory[o].dataValues.notice.noticeType.partition
        }
      };
      // const bb = newNoticehistory.propertyIsEnumerable();
      const newDepartment = {
        id: noticeHistory[o].dataValues.hrmDepartment.id,
        departmentname: noticeHistory[o].hrmDepartment.departmentname
      };
      // 这里有一个疑问，这是先创建对象，再赋值，但是这里并不会失败，查询列表的时候如果这样写会失败
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

    // 使用reducer处理数组，这里可以再思考一下，看看是否可以抽象成一个公用的方法
    const reducefucn = (rs, item) => {
      rs.push(item);
      if (item.list) {
        rs = rs.concat(item.list.reduce(reducefucn, []));
      }
      delete item.list;
      return rs;
    };
    const tempResults = dempartmentArray.reduce(reducefucn, []);
    // 部门id数组
    const departmentIdList = [];
    // 遍历dempartmentArray，往数据库插入数据
    for (let index = 0; index < tempResults.length; index++) {
      params.departmentId = tempResults[index].id;
      departmentIdList.push(params.departmentId);
      // 插入数据
      const noticeHistory = await this.app.model.NoticeHistory.create(params);
      if (noticeHistory) continue;
    }
    const Op = this.app.Sequelize.Op;
    // 根据部门id，查询部门下的员工信息
    const userInfo = await this.app.model.HrmResource.findAll({
      where: {
        departmentid: {
          [Op.in]: departmentIdList
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

  // 使用reducer处理数组
}

module.exports = NoticeHistoryService;
