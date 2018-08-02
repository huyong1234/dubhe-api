'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/oss.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /api/OSSConfig/Banner', () => {
    return app
      .httpRequest()
      .get('/api/OSSConfig/Banner')
      .expect((res) => {
        const { body } = res;
        const {
          accessKeyId,
          bucket,
          endpoint,
          policys: { banner }
        } = app.config.aliyunOSS;
        assert(accessKeyId === body.accessid);
        assert(banner.dir === body.dir);
        assert(`http://${bucket}.${endpoint}` === body.host);
      })
      .expect(200);
  });
  it('should GET /api/OSSConfig/Apply', () => {
    return app
      .httpRequest()
      .get('/api/OSSConfig/Apply')
      .expect((res) => {
        const { body } = res;
        const {
          accessKeyId,
          bucket,
          endpoint,
          policys: { apply }
        } = app.config.aliyunOSS;
        assert(accessKeyId === body.accessid);
        assert(apply.dir === body.dir);
        assert(`http://${bucket}.${endpoint}` === body.host);
      })
      .expect(200);
  });
  it('should GET /api/OSSConfig/ScenicStatis', () => {
    return app
      .httpRequest()
      .get('/api/OSSConfig/ScenicStatis')
      .expect((res) => {
        const { body } = res;
        const {
          accessKeyId,
          bucket,
          endpoint,
          policys: { scenicStatis }
        } = app.config.aliyunOSS;
        assert(accessKeyId === body.accessid);
        assert(scenicStatis.dir === body.dir);
        assert(`http://${bucket}.${endpoint}` === body.host);
      })
      .expect(200);
  });
});
