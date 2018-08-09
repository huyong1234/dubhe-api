'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/role.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

  });

  // 查询角色列表接口
  it('should GET /api/Roles', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/Roles'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length >= 0);
        })
        .expect(200)
    );
  });

  // 查询角色对象接口
  it('should GET /api/Roles/:id', () => {
    return app
      .httpRequest()
      .get('/api/Roles/1')
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.name);
      });
  });

});
