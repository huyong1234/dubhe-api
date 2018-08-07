'use strict';
module.exports = (app) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const TABLBE_NAME = 'uf_DUBHE_ScenicStatisType';
  const DataLatitude = app.model.define(
    'dataLatitude',
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
      },
      requestId: {
        allowNull: true,
        type: INTEGER
      },
      sys_isDelete: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
      },
      sys_updator: {
        allowNull: true,
        type: INTEGER
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_updateTime'
      },
      sys_adder: {
        type: INTEGER,
        allowNull: true
      },
      created_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_addTime'
      },
      scenicId: {
        allowNull: false,
        type: STRING(32)
      },
      parentId: {
        allowNull: false,
        type: STRING(32)
      },
      name: {
        allowNull: false,
        type: STRING
      },
      subName: {
        allowNull: true,
        type: STRING
      },
      icon: {
        allowNull: true,
        type: STRING(32)
      },
      orderBy: {
        type: INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: TABLBE_NAME
    }
  );

  return DataLatitude;
};
