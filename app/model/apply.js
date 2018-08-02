'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Apply = app.model.define(
    'apply',
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
      },
      requestId: {
        type: INTEGER,
        allowNull: false
      },
      sys_updator: {
        allowNull: false,
        type: INTEGER
      },
      sys_isDelete: {
        allowNull: false,
        type: INTEGER
      },
      sys_adder: {
        allowNull: false,
        type: INTEGER
      },
      // 这个字段在数据库是string 类型
      applyGroupId: {
        allowNull: false,
        type: INTEGER
      },
      name: {
        allowNull: false,
        type: STRING(20)
      },
      actionType: {
        allowNull: false,
        type: INTEGER
      },
      action: {
        allowNull: false,
        type: STRING(20)
      },
      icon: {
        allowNull: false,
        type: STRING
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
      },
      // 这个字段数据库里写错了，应该是orderBy
      oderBy: {
        type: INTEGER
      }
    },
    {
      tableName: 'uf_DUBHE_Apply'
    }
  );

  return Apply;
};
