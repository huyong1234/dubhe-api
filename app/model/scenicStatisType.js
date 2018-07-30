'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ApplyGroup = app.model.define(
    'uf_DUBHE_ScenicStatisType',
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
        defaultValue: '((0))'
      },
      sys_updator: {
        type: INTEGER,
        allowNull: true
      },
      sys_updateTime: {
        type: STRING,
        allowNull: false,
        defaultValue: '(CONVERT([varchar](30),getdate(),(25)))'
      },
      sys_adder: {
        type: INTEGER,
        allowNull: true
      },
      sys_addTime: {
        type: STRING,
        allowNull: false,
        defaultValue: '(CONVERT([varchar](30),getdate(),(25)))'
      },
      scenicId: {
        type: STRING,
        allowNull: true
      },
      parentId: {
        type: STRING,
        allowNull: true
      },
      name: {
        type: STRING,
        allowNull: true
      },
      subName: {
        type: STRING,
        allowNull: true
      },
      icon: {
        type: STRING,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_ScenicStatisType',
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: false
    }
  );
  return ApplyGroup;
};
