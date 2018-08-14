'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const Department = app.model.define(
    'department',
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
      },
      ecology_pinyin_search: {
        type: STRING,
        allowNull: true
      },
      tlevel: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'HrmDepartment'
    }
  );
  return Department;
};
