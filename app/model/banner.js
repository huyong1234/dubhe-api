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
      sys_isDelete: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
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
        type: INTEGER
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
      // c
      freezeTableName: true,
      tableName: TABLBE_NAME
    }
  );

  return Banner;
};
