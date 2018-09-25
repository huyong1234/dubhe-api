'use strict';
module.exports = (app) => {
  const { INTEGER, DATE } = app.Sequelize;
  const NoticeHistory = app.model.define(
    'noticeHistory',
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
      notice_id: {
        type: INTEGER,
        allowNull: true,
        field: 'noticeId'
      },
      companyId: {
        type: INTEGER,
        allowNull: true
      },
      departmentId: {
        type: INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'uf_DUBHE_NoticeHistory'
    }
  );
  // 建立两表关系，便于及联查询
  NoticeHistory.associate = function() {
    app.model.NoticeHistory.belongsTo(app.model.Notice, { foreignKey: 'noticeId', targetKey: 'id' });
    app.model.NoticeHistory.belongsTo(app.model.HrmDepartment, { foreignKey: 'departmentId', targetKey: 'id' });
  };
  return NoticeHistory;
};
