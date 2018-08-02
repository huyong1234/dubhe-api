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
        allowNull: false,
        type: STRING(32)
      },
      name: {
        allowNull: false,
        type: STRING(20)
      },
      // 这个字段数据库里写错了，应该是orderBy
      oderBy: {
        allowNull: false,
        type: INTEGER
      },
      sys_updator: {
        allowNull: false,
        type: INTEGER
      },
      requestId: {
        allowNull: false,
        type: INTEGER
      },
      sys_isDelete: {
        allowNull: false,
        type: INTEGER
      },
      created_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_addTime'
      },
      updated_at: {
        type: DATE,
        allowNull: false,
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
