'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/noticeType.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  // 查询通知类型列表接口
  it('should GET /api/NoticesType', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/NoticesType?companyId=1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Array);
        })
        .expect(200)
    );
  });
});
