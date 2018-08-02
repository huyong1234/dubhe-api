'use strict';
module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const TABLBE_NAME = 'uf_DUBHE_Banner';
  const Banner = app.model.define(
    'banner',
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
      },
      requestId: {
        allowNull: false,
        type: INTEGER
      },
      sys_isDelete: {
        allowNull: false,
        type: INTEGER
      },
      sys_updator: {
        allowNull: false,
        type: INTEGER
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_updateTime'
      },
      sys_adder: {
        type: INTEGER,
        allowNull: false
      },
      created_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_addTime'
      },
      companyId: {
        allowNull: false,
        type: STRING(32)
      },
      name: {
        allowNull: false,
        type: STRING
      },
      imgId: {
        allowNull: false,
        type: STRING(32)
      },
      actionType: {
        allowNull: false,
        type: INTEGER
      },
      action: {
        allowNull: false,
        type: STRING(100)
      },
      orderBy: {
        allowNull: false,
        type: INTEGER
      }
    },
    {
      // timestamps: false,
      freezeTableName: true,
      tableName: TABLBE_NAME
    }
  );

  return Banner;
};
