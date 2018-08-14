'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const Users = app.model.define(
    'users',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
      },
      lastname: {
        type: STRING,
        allowNull: true
      },
      resourceimageid: {
        type: STRING,
        allowNull: true
      },
      companyId: {
        type: INTEGER,
        allowNull: true,
        field: 'subcompanyid1'
      },
      departmentid: {
        type: INTEGER,
        allowNull: true
      },
      jobtitle: {
        type: INTEGER,
        allowNull: true
      },
      mobile: {
        type: STRING,
        allowNull: true
      },
      email: {
        type: STRING,
        allowNull: true
      },
      telephone: {
        type: STRING,
        allowNull: true
      },
      SSOID: {
        type: STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'HrmResource'
    }
  );
  return Users;
};
