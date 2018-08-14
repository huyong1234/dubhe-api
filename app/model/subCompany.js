/* jshint indent: 2 */

'use strict';
module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const SubCompany = app.model.define(
    'subCompany',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      subcompanyname: {
        type: STRING,
        allowNull: true
      },
      subcompanydesc: {
        type: STRING,
        allowNull: true
      },
      companyid: {
        type: INTEGER,
        allowNull: true
      },
      supsubcomid: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      url: {
        type: STRING,
        allowNull: true
      },
      showorder: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'HrmSubCompany'
    }
  );
  return SubCompany;
};
