'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const RoleApplyGroup = app.model.define(
    'roleApplyGroup',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      requestId: {
        type: INTEGER,
        allowNull: false
      },
      sys_isDelete: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sys_updator: {
        type: INTEGER,
        allowNull: false
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
      roleId: {
        type: STRING,
        allowNull: false
      },
      applyGroupId: {
        type: STRING,
        allowNull: false
      },
      orderBy: {
        type: INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'uf_DUBHE_R_RoleApplyGroup'
    }
  );
  return RoleApplyGroup;
};
