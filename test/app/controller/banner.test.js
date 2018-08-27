'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/banner.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    name: '单元测试',
    sys_adder: 1,
    companyId: 1,
    imgId: 1,
    action: 1,
    orderBy: 10,
    actionType: 1,
    sys_updator: 1
  };
  // 新建banner接口
  it('should POST /api/Banners', () => {
    return app
      .httpRequest()
      .post('/api/Banners')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        testobj.id = body.id;
        assert(body.name, testobj.name);
        assert(body.imgId, testobj.imgId);
        assert(body.action, testobj.action);
        assert(body.orderBy, testobj.orderBy);
        assert(body.actionType, testobj.actionType);
        assert(body.created_at);
      })
      .expect(200);
  });

  // 修改banner接口
  it('should PATCH /api/Banners/:id', () => {
    testobj.name = '单元测试123';
    return app
      .httpRequest()
      .patch(`/api/Banners/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.name, testobj.name);
        assert(body.imgId, testobj.imgId);
        assert(body.action, testobj.action);
        assert(body.orderBy, testobj.orderBy);
        assert(body.actionType, testobj.actionType);
        assert(body.created_at);
        assert(body.updated_at);
      })
      .expect(200);
  });

  // 查询banner列表接口
  it('should GET /api/Banners', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/Banners/?limit=4&offSet=0&companyId=1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询banner对象接口
  it('should GET /api/Banners/:id', () => {
    return app
      .httpRequest()
      .get(`/api/Banners/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.imgId, testobj.imgId);
        assert(body.action, testobj.action);
        assert(body.orderBy, testobj.orderBy);
        assert(body.actionType, testobj.actionType);
        assert(body.created_at);
      });
  });

  // 删除banner对象接口
  it('should DELETE /api/Banners/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/Banners/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
