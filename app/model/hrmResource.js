'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const HrmResource = app.model.define(
    'hrmResource',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
      },
      loginid: {
        type: STRING,
        allowNull: true
      },
      lastname: {
        type: STRING,
        allowNull: true
      },
      telephone: {
        type: STRING,
        allowNull: true
      },
      mobile: {
        type: STRING,
        allowNull: true
      },
      departmentid: {
        type: INTEGER,
        allowNull: true
      },
      subcompanyid1: {
        type: INTEGER,
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
  return HrmResource;
};
