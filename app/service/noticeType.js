'use strict';

const Service = require('egg').Service;

class NoticeTypeService extends Service {
  async getNoticeTypeList(companyId) {
    const noticeTypeList = await this.app.model.NoticeType.findAll({
      where: {
        companyId,
        sys_isDelete: 0
      },
      attributes: ['partition'],
      group: 'partition'
    });
    for (let index = 0; index < noticeTypeList.length; index++) {
      const noticeType = await this.app.model.NoticeType.findAll({
        where: {
          companyId,
          sys_isDelete: 0,
          // 区分是自动触发还是后台新建的
          is_automatic: 1,
          partition: noticeTypeList[index].partition
        },
        attributes: ['id', 'name']
      });
      noticeTypeList[index].dataValues.noticeType = noticeType;
    }

    return noticeTypeList;
  }
}

module.exports = NoticeTypeService;
