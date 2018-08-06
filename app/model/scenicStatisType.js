'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const ScenicStatisType = app.model.define(
    'scenicStatisType',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      requestId: {
        type: INTEGER,
        allowNull: true
      },
      sys_isDelete: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sys_updator: {
        type: INTEGER,
        allowNull: true
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
        type: STRING,
        allowNull: false
      },
      parentId: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: false
      },
      subName: {
        type: STRING,
        allowNull: true
      },
      icon: {
        type: STRING,
        allowNull: false
      },
      orderBy: {
        type: INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'uf_DUBHE_ScenicStatisType'
    }
  );
  return ScenicStatisType;
};
