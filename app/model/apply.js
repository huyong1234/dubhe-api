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
      sys_updateTime: {
        type: DATE
      },
      sys_isDelete: {
        type: INTEGER
      },
      sys_addTime: {
        type: DATE
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

      // 这个字段数据库里写错了，应该是orderBy
      oderBy: {
        type: INTEGER
      }
    },
    {
      tableName: 'uf_DUBHE_Apply',
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: false
    }
  );

  return Apply;
};
