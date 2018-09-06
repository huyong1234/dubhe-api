'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const HrmDepartment = app.model.define(
    'hrmDepartment',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      departmentmark: {
        type: STRING,
        allowNull: true
      },
      departmentname: {
        type: STRING,
        allowNull: true
      },
      subcompanyid1: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'HrmDepartment'
    }
  );
  return HrmDepartment;
};
