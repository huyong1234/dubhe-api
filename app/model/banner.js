'use strict';
module.exports = (app) => {
  const { INTEGER } = app.Sequelize;
  const TABLBE_NAME = 'DUBHE_Banner';
  const Banner = app.model.define(
    'banner',
    {
      id: {
        type: INTEGER,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: TABLBE_NAME
    }
  );

  return Banner;
};
