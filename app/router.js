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
  // router.get('/api/ApplyGroups', controller.applyGroup.getApplyGroup);
=======
  router.resources('applyGroups', '/api/ApplyGroups', controller.applyGroup);

  router.get('/api/OSSConfig/Banner', controller.oss.getBannerUploadPathAndSignature);
  router.get('/api/OSSConfig/Apply', controller.oss.getApplyUploadPathAndSignature);
  router.get('/api/OSSConfig/ScenicStatis', controller.oss.getScenicStatisUploadPathAndSignature);
>>>>>>> 60e619e27d6c6374cf830586b32c40cf9ca2fb3b
};
