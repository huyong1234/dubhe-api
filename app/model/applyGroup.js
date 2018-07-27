'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ApplyGroup = app.model.define(
    'applyGroup',
    {
      id: {
        type: STRING(32),
        primaryKey: true // 设置主键
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
      isDeleted: {
        type: INTEGER
      },
      insertTime: {
        type: DATE
      },
      updateTime: {
        type: DATE
      }
    },
    {
      tableName: 'DUBHE_ApplyGroup',
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: false
    }
  );

  return ApplyGroup;
};
