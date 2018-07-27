'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/banners', controller.banner.getBanners);
<<<<<<< HEAD

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
=======
  router.get('/api/ApplyGroups', controller.applyGroup.getApplyGroup);
>>>>>>> 2eaabfa958af9ec0e576bc112ef6644223407074
};
