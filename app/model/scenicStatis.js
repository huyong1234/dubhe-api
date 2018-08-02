'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const ScenicStatis = app.model.define(
    'scenicStatis',
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
      scenicStatisTypeId: {
        type: STRING,
        allowNull: true
      },
      modelId: {
        type: STRING,
        allowNull: true
      },
      contents: {
        type: STRING,
        allowNull: true
      },
      name: {
        type: STRING,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_ScenicStatis'
    }
  );
  return ScenicStatis;
};
