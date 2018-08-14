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
        type: INTEGER
      },
      name: {
        allowNull: false,
        type: STRING(20)
      },
      orderBy: {
        allowNull: false,
        type: INTEGER
      },
      sys_adder: {
        type: INTEGER,
        allowNull: true
      },
      sys_updator: {
        allowNull: true,
        type: INTEGER
      },
      sys_isDelete: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
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
