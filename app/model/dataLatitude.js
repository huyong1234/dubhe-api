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
      sys_updateTime: {
        allowNull: false,
        type: DATE
      },
      sys_adder: {
        allowNull: false,
        type: INTEGER
      },
      sys_addTime: {
        allowNull: false,
        type: DATE
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
        allowNull: false,
        type: STRING(32)
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: TABLBE_NAME
    }
  );

  return DataLatitude;
};
