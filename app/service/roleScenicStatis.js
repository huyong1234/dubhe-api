'use strict';

const Service = require('egg').Service;

class RoleScenicStatisService extends Service {
  // 查询列表
  async getRoleScenicStatisList(id) {
    // 创建返回列表
    const roleScenicStatisList = [];
    const type = typeof id;
    // 判断：如果参数验证错误，抛出错误
    if (type !== 'number') {
      this.ctx.throw('id should be an INTEGER');
    }
    // 查询条件
    const whereSearchRoleScenicStatis = {
      sys_isDelete: 0,
      roleId: id
    };
    // 按roleId查询roleScenicStatis表
    const roleScenicStatises = await this.app.model.RoleScenicStatis.findAll({
      where: whereSearchRoleScenicStatis,
      attributes: ['scenicStatisId', 'roleId', 'orderBy']
    });

    // 遍历roleScenicStatis
    for (const o in roleScenicStatises) {
      // 创建roleScenicStatis对象
      const roleScenicStatis = {};
      roleScenicStatis.scenicStatisId = roleScenicStatises[o].scenicStatisId;
      roleScenicStatis.roleId = roleScenicStatises[o].roleId;
      roleScenicStatis.orderBy = roleScenicStatises[o].orderBy;
      // 根据scenicStatisId查询ScenicStatis表
      const scenicStatis = await this.app.model.ScenicStatis.findById(roleScenicStatises[o].scenicStatisId, {
        attributes: ['id', 'modelId', 'contents', 'scenicStatisTypeId', 'name', 'orderBy']
      });
      roleScenicStatis.scenicStatisModelId = scenicStatis.modelId;
      roleScenicStatis.scenicStatisName = scenicStatis.name;
      roleScenicStatis.scenicStatisOrderBy = scenicStatis.orderBy;
      roleScenicStatis.scenicStatisContents = scenicStatis.contents;
      roleScenicStatis.scenicStatisTypeId = scenicStatis.scenicStatisTypeId;
      // 根据scenicStatisTypeId查询scenicStatisType表
      const scenicStatisType = await this.app.model.ScenicStatisType.findById(scenicStatis.scenicStatisTypeId, {
        attributes: ['id', 'parentId', 'name', 'subName', 'icon', 'orderBy']
      });
      roleScenicStatis.dataLatitudesNmae = scenicStatisType.name;
      roleScenicStatis.dataLatitudesId = scenicStatisType.id;
      roleScenicStatis.scenicStatisTypeSubName = scenicStatisType.subName;
      roleScenicStatis.scenicStatisTypeOrderBy = scenicStatisType.orderBy;
      roleScenicStatis.scenicStatisTypeIcon = scenicStatisType.icon;
      roleScenicStatis.scenicStatisTypeId = scenicStatisType.parentId;

      // 根据parentId查询scenicStatisType表，获取统计数据类型名称
      const scenicStatisTypeParent = await this.app.model.ScenicStatisType.findById(scenicStatisType.parentId, {
        attributes: ['id', 'name']
      });
      roleScenicStatis.scenicStatisTypeName = scenicStatisTypeParent.name;
      // 将roleApply对象放入roleApplyList
      roleScenicStatisList.push(roleScenicStatis);
    }

    // 组装接口返回列表
    return roleScenicStatisList;
  }

  // 新建
  async createRoleScenicStatis(params) {
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      scenicStatisId: {
        required: true,
        type: 'int'
      },
      orderBy: {
        required: true,
        type: 'int'
      },
      sys_adder: {
        required: true,
        type: 'int'
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
    // 新增一条roleScenicStatis数据
    const roleScenicStatis = await this.app.model.RoleScenicStatis.create(params);

    // 组装返回信息
    const result = {};
    result.roleId = roleScenicStatis.roleId;
    result.scenicStatisId = roleScenicStatis.scenicStatisId;
    result.scenicStatisOrderBy = roleScenicStatis.orderBy;

    return result;
  }

  // 删除
  async destroy(params) {
    // 配置校验规则
    const rules = {
      roleId: {
        required: true,
        type: 'int'
      },
      scenicStatisId: {
        required: true,
        type: 'int'
      }
    };
    // 参数校验
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
    const result = await this.app.model.RoleScenicStatis.update(
      {
        sys_isDelete: 1
      },
      {
        where: params
      }
    );
    return result;
  }
}

module.exports = RoleScenicStatisService;
