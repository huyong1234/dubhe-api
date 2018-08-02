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
        type: INTEGER
      },
      sys_updator: {
        type: INTEGER
      },
      sys_isDelete: {
        type: INTEGER
      },
      sys_adder: {
        type: INTEGER
      },
      // 这个字段在数据库是string 类型
      applyGroupId: {
        type: INTEGER
      },
      name: {
        type: STRING(20)
      },
      actionType: {
        type: INTEGER
      },
      action: {
        type: STRING(20)
      },
      icon: {
        type: STRING
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
