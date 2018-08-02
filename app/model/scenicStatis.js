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
        allowNull: false
      },
      sys_isDelete: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sys_updator: {
        type: INTEGER,
        allowNull: false
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_updateTime'
      },
      sys_adder: {
        type: INTEGER,
        allowNull: false
      },
      created_at: {
        type: DATE,
        allowNull: false,
        field: 'sys_addTime'
      },
      scenicStatisTypeId: {
        type: STRING,
        allowNull: false
      },
      modelId: {
        type: STRING,
        allowNull: false
      },
      contents: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: false
      }
    },
    {
      tableName: 'uf_DUBHE_ScenicStatis'
    }
  );
  return ScenicStatis;
};
