'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const RoleScenicStatisType = app.model.define(
    'roleScenicStatisType',
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
      roleId: {
        type: INTEGER,
        allowNull: true
      },
      scenicStatisTypeId: {
        type: INTEGER,
        allowNull: true
      },
      orderBy: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_R_RoleScenicStatisType'
    }
  );
  return RoleScenicStatisType;
};
