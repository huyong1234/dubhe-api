'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Role = app.model.define(
    'role',
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true // 设置自增
      },
      name: {
        allowNull: false,
        type: STRING(20)
      },
      isDeleted: {
        allowNull: false,
        type: INTEGER,
        field: 'sys_isDelete'
      },
      created_at: {
        allowNull: false,
        type: DATE,
        field: 'sys_addTime'
      },
      updated_at: {
        allowNull: false,
        type: DATE,
        field: 'sys_updateTime'
      }
    },
    {
      tableName: 'uf_DUBHE_Role'
    }
  );

  return Role;
};
