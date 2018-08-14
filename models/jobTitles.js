/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HrmJobTitles', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    jobtitlemark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobtitlename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobtitleremark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jobactivityid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jobdepartmentid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jobresponsibility: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobcompetency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobdoc: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jobtitlecode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    outkey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ecology_pinyin_search: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'HrmJobTitles'
  });
};
