'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ApplyGroup = app.model.define(
    'applyGroup',
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
      },
      companyId: {
        type: STRING(32)
      },
      name: {
        type: STRING(20)
      },
      // 这个字段数据库里写错了，应该是orderBy
      oderBy: {
        type: INTEGER
      },
      sys_updator: {
        type: INTEGER
      },
      requestId: {
        type: INTEGER
      },
      sys_isDelete: {
        type: INTEGER
      },
      sys_addTime: {
        type: DATE
      },
      sys_updateTime: {
        type: DATE
      }
    },
    {
      tableName: 'uf_DUBHE_ApplyGroup',
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: false
    }
  );

  return ApplyGroup;
};
