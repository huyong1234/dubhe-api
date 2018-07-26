'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
<<<<<<< HEAD
  router.get('/demo', controller.oss.createPolicy);
=======

  router.get('/api/banners', controller.banner.getBanners);
>>>>>>> 135837986f12a8681a284331a9b2974daeb48c25
};
