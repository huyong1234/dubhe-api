'use strict';
module.exports = (app) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Notice = app.model.define(
    'notice',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
      noticeTypeId: {
        type: STRING,
        allowNull: true,
        // 设置外键
        references: {
          model: 'NoticeType',
          key: 'id'
        }
      },
      title: {
        type: STRING,
        allowNull: true
      },
      contents: {
        type: TEXT,
        allowNull: true
      },
      status: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_Notice'
    }
  );
  // 建立两表关系，便于及联查询
  Notice.associate = function() {
    app.model.Notice.belongsTo(app.model.NoticeType, { foreignKey: 'noticeTypeId', targetKey: 'id' });
  };
  return Notice;
};
