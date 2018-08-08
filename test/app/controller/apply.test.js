'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/apply.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    applyGroupId: 1,
    name: '单元测试',
    actionType: 1,
    action: 1,
    icon: 1,
    orderBy: 10,
    sys_adder: 1,
    sys_updator: 1
  };
  // 新建apply接口
  it('should POST /api/Applies', () => {
    return app
      .httpRequest()
      .post('/api/Applies')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        testobj.id = body.id;
        assert(body.applyGroupId, testobj.applyGroupId);
        assert(body.name, testobj.name);
        assert(body.actionType, testobj.actionType);
        assert(body.action, testobj.action);
        assert(body.icon, testobj.icon);
        assert(body.orderBy, testobj.orderBy);
        assert(body.updated_at, testobj.updated_at);
        assert(body.created_at);
      })
      .expect(200);
  });

  // 修改apply接口
  it('should PATCH /api/Applies/:id', () => {
    testobj.name = '单元测试123';
    return app
      .httpRequest()
      .patch(`/api/Applies/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.applyGroupId, testobj.applyGroupId);
        assert(body.name, testobj.name);
        assert(body.actionType, testobj.actionType);
        assert(body.action, testobj.action);
        assert(body.icon, testobj.icon);
        assert(body.orderBy, testobj.orderBy);
        assert(body.sys_updateTime, testobj.sys_updateTime);
        assert(body.sys_addTime);
      })
      .expect(200);
  });

  // 查询apply列表接口
  it('should GET /api/Applies', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/Applies/?limit=4&offSet=0'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询apply对象接口
  it('should GET /api/Applies/:id', () => {
    return app
      .httpRequest()
      .get(`/api/Applies/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.actionType, testobj.actionType);
        assert(body.action, testobj.action);
        assert(body.icon, testobj.icon);
        assert(body.orderBy, testobj.orderBy);
      });
  });

  // 删除apply对象接口
  it('should DELETE /api/Applies/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/Applies/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
