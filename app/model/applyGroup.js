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
      isDeleted: {
        type: INTEGER
      },
      created_at: {
        type: DATE,
        field: 'sys_addTime'
      },
      updated_at: {
        type: DATE,
        field: 'sys_updateTime'
      }
    },
    {
      tableName: 'uf_DUBHE_ApplyGroup'
      // timestamps: true
    }
  );

  return ApplyGroup;
};
