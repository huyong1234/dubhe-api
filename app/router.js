'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = (app) => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/api/banners', controller.banner.getBanners);
  // api/ApplyGroups
  router.resources('applyGroups', '/api/ApplyGroups', controller.applyGroup);
  // api/Applies
  router.resources('applys', '/api/Applies', controller.apply);
  // api/Roles
  router.resources('roles', '/api/Roles', controller.role);
  // api/RoleApplies
  router.resources('roleApplies', '/api/RoleApplies', controller.roleApply);
  // api/RoleScenicStatis
  router.resources('roleScenicStatises', '/api/RoleScenicStatis', controller.roleScenicStatis);
  // oss上传
  router.get('/api/OSSConfig/Banner', controller.oss.getBannerUploadPathAndSignature);
  router.get('/api/OSSConfig/Apply', controller.oss.getApplyUploadPathAndSignature);
  router.get('/api/OSSConfig/ScenicStatis', controller.oss.getScenicStatisUploadPathAndSignature);
};
