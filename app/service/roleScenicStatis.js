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
      scenicStatisOrderBy: {
        required: true,
        type: 'int'
      },
      dataLatitudeId: {
        required: true,
        type: 'int'
      },
      dataLatitudeOrderBy: {
        required: true,
        type: 'int'
      },
      scenicStatisTypeId: {
        type: 'int',
        required: true
      },
      scenicStatisTypeOrderBy: {
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
    const roleScenicStatisParams = {
      roleId: params.roleId,
      scenicStatisId: params.scenicStatisId,
      orderBy: params.scenicStatisOrderBy,
      sys_adder: params.sys_adder
    };
    // 新增一条roleScenicStatis数据
    const roleScenicStatis = await this.app.model.RoleScenicStatis.create(roleScenicStatisParams);
    /**
     * 判断是否需要及联在RoleScenicStatisType中添加数据
     */
    // 封装一级菜单查询参数
    const roleScenicStatisTypeListParams = {
      scenicStatisTypeId: params.scenicStatisTypeId,
      roleId: params.roleId
    };
    // 查询roleScenicStatisType表，判断scenicStatis对应的scenicStatisType是否存在该表中(一级菜单)
    const dbRoleScenicStatisType = await this.ctx.service.roleScenicStatisType.getRoleScenicStatisTypeList(
      roleScenicStatisTypeListParams
    );
    // 若dbRoleScenicStatisType集合长度等于0，表示scenicStatis对应的scenicStatisType还没有权限，则需要执行添加操作
    // 如果一级菜单需要添加权限，则正面下面的二级菜单也需要添加权限
    if (dbRoleScenicStatisType.length === 0) {
      const scenicStatisType = {
        scenicStatisTypeId: params.scenicStatisTypeId,
        scenicStatisTypeOrderBy: params.scenicStatisTypeOrderBy
      };
      const dataLatitude = {
        scenicStatisTypeId: params.dataLatitudeId,
        scenicStatisTypeOrderBy: params.dataLatitudeOrderBy
      };
      const array = [scenicStatisType, dataLatitude];
      // 封装添加参数
      const addRoleScenicStatisTypeParams = {
        roleId: params.roleId,
        sys_adder: params.sys_adder
      };
      for (const o in array) {
        addRoleScenicStatisTypeParams.scenicStatisTypeId = array[o].scenicStatisTypeId;
        addRoleScenicStatisTypeParams.orderBy = array[o].scenicStatisTypeOrderBy;
        // 往权限表插入数据
        await this.ctx.service.roleScenicStatisType.addRoleScenicStatisType(addRoleScenicStatisTypeParams);
      }
    }

    // 如果一级菜单已经有权限，则判断二级菜单是否需要添加权限
    if (dbRoleScenicStatisType.length > 0) {
      // 封装二级菜单查询参数
      const dataLatitudeParams = {
        scenicStatisTypeId: params.dataLatitudeId,
        roleId: params.dataLatitudeOrderBy
      };
      const dataLatitudeList = await this.ctx.service.roleScenicStatisType.getRoleScenicStatisTypeList(
        dataLatitudeParams
      );
      if (dataLatitudeList.length === 0) {
        // 封装添加参数
        const addDataLatitudeParams = {
          roleId: params.roleId,
          sys_adder: params.sys_adder,
          scenicStatisTypeId: params.dataLatitudeId,
          orderBy: params.dataLatitudeOrderBy
        };
        // 往权限表插入数据
        await this.ctx.service.roleScenicStatisType.addRoleScenicStatisType(addDataLatitudeParams);
      }
    }

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
      },
      dataLatitudeId: {
        required: true,
        type: 'int'
      },
      scenicStatisTypeId: {
        required: true,
        type: 'int'
      },
      sys_updator: {
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
    const whereSearch = {
      roleId: params.roleId,
      scenicStatisId: params.scenicStatisId
    };
    const result = await this.app.model.RoleScenicStatis.update(
      {
        sys_isDelete: 1,
        sys_updator: params.sys_updator
      },
      {
        where: whereSearch
      }
    );
    /** *
     * 判断是否需要及联删除RoleScenicStatisType中的数据
     */
    // 根据scenicStatisTypeId查询对应的scenicStatisId
    const scenicStatis = await this.app.model.ScenicStatis.findAll({
      where: {
        sys_isDelete: 0,
        scenicStatisTypeId: params.dataLatitudeId
      }
    });
    // 遍历scenicStatis集合，将scenicStatisId放入数组
    const scenicStatisIdList = [];
    for (const o in scenicStatis) {
      scenicStatisIdList.push(scenicStatis[o].id);
    }
    // 查询roleScenicStatis表，判断roleId对应的scenicStatisTypeId是否在scenicStatisIdList这个数组中
    const Op = this.app.Sequelize.Op;
    const roleScenicStatis = await this.app.model.RoleScenicStatis.findAll({
      where: {
        sys_isDelete: 0,
        roleId: params.roleId,
        scenicStatisId: {
          [Op.in]: scenicStatisIdList
        }
      }
    });
    // 判断是否需要删除二级菜单权限
    // 若roleScenicStatis集合长度等于0，则证明scenicStatisTypeId下对应的具体数据，在roleScenicStatis表中已无权限，则需要级联删除RoleScenicStatisType中的数据
    if (roleScenicStatis.length === 0) {
      const deleteRoleApplyGroupParams = {
        roleId: params.roleId,
        scenicStatisTypeId: params.dataLatitudeId,
        sys_updator: params.sys_updator
      };
      await this.service.roleScenicStatisType.deleteRoleScenicStatisType(deleteRoleApplyGroupParams);

      // 判断是否需要继续及联删除一级菜单权限
      const scenicStatisByDataLatitudeId = await this.app.model.ScenicStatisType.findAll({
        where: {
          sys_isDelete: 0,
          parentId: params.scenicStatisTypeId
        }
      });
      // 遍历scenicStatis集合，将scenicStatisId放入数组
      const scenicStatisIdListByDataLatitudeId = [];
      for (const o in scenicStatisByDataLatitudeId) {
        scenicStatisIdListByDataLatitudeId.push(scenicStatisByDataLatitudeId[o].id);
      }
      // 查询roleScenicStatis表，判断roleId对应的scenicStatisTypeId是否在scenicStatisIdList这个数组
      const roleScenicStatisByDataLatitudeId = await this.app.model.RoleScenicStatisType.findAll({
        where: {
          sys_isDelete: 0,
          roleId: params.roleId,
          scenicStatisTypeId: {
            [Op.in]: scenicStatisIdListByDataLatitudeId
          }
        }
      });
      // 判断是否需要删除一级菜单权限
      // 若roleScenicStatis集合长度等于0，则证明scenicStatisTypeId下对应的具体数据，在roleScenicStatis表中已无权限，则需要级联删除RoleScenicStatisType中的数据
      if (roleScenicStatisByDataLatitudeId.length === 0) {
        const deleteRoleApplyGroupParams = {
          roleId: params.roleId,
          scenicStatisTypeId: params.scenicStatisTypeId,
          sys_updator: params.sys_updator
        };
        await this.service.roleScenicStatisType.deleteRoleScenicStatisType(deleteRoleApplyGroupParams);
      }
    }
    return result;
  }
}

module.exports = RoleScenicStatisService;
