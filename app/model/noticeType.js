'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const NoticeType = app.model.define(
    'noticeType',
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
      companyId: {
        type: INTEGER,
        allowNull: true
      },
      partition: {
        type: INTEGER,
        allowNull: true
      },
      name: {
        type: STRING,
        allowNull: true
      },
      orderBy: {
        type: INTEGER,
        allowNull: true
      },
      is_automatic: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_NoticeType'
    }
  );
  return NoticeType;
};
