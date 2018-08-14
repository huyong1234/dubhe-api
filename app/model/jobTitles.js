'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const JobTitles = app.model.define(
    'jobTitles',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      jobtitlemark: {
        type: STRING,
        allowNull: true
      },
      jobtitlename: {
        type: STRING,
        allowNull: true
      },
      jobtitleremark: {
        type: TEXT,
        allowNull: true
      },
      jobactivityid: {
        type: INTEGER,
        allowNull: true
      },
      jobdepartmentid: {
        type: INTEGER,
        allowNull: true
      },
      jobresponsibility: {
        type: STRING,
        allowNull: true
      },
      jobcompetency: {
        type: STRING,
        allowNull: true
      },
      jobdoc: {
        type: INTEGER,
        allowNull: true
      },
      jobtitlecode: {
        type: STRING,
        allowNull: true
      },
      outkey: {
        type: STRING,
        allowNull: true
      },
      ecology_pinyin_search: {
        type: STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'HrmJobTitles'
    }
  );
  return JobTitles;
};
