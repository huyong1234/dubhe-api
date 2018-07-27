'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/banners', controller.banner.getBanners);
  router.get('/api/ApplyGroups', controller.applyGroup.getApplyGroup);
};
