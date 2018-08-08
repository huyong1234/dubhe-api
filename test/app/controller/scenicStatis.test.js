'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/scenicStatis.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

  });
  const testobj = {
    id: 18,
    name: '测试额',
    orderBy: 10,
    modelId: 1
  };

  // 修改ScenicStatis接口
  it('should PATCH /api/ScenicStatis/:id', () => {
    return app
      .httpRequest()
      .patch(`/api/ScenicStatis/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        testobj.contents = body.contents;
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.contents, testobj.contents);
        assert(body.orderBy, testobj.orderBy);
        assert(body.modelId, testobj.modelId);
      })
      .expect(200);
  });

  // 查询ScenicStatis列表接口
  it('should GET /api/ScenicStatis', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI(`/api/ScenicStatis/?id=${testobj.id}`))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length >= 0);
        })
        .expect(200)
    );
  });

  // 查询ScenicStatis对象接口
  it('should GET /api/ScenicStatis/:id', () => {
    return app
      .httpRequest()
      .get(`/api/ScenicStatis/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.contents, testobj.contents);
        assert(body.orderBy, testobj.orderBy);
        assert(body.modelId, testobj.modelId);
      });
  });

  // 删除ScenicStatis对象接口
  it('should DELETE /api/ScenicStatis/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/ScenicStatis/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
