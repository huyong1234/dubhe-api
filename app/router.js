'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/banners', controller.banner.getBanners);

  router.get(
    '/api/OSSConfig/Banner',
    controller.oss.getBannerUploadPathAndSignature
  );
  router.get(
    '/api/OSSConfig/Apply',
    controller.oss.getApplyUploadPathAndSignature
  );
  router.get(
    '/api/OSSConfig/ScenicStatis',
    controller.oss.getScenicStatisUploadPathAndSignature
  );
};
