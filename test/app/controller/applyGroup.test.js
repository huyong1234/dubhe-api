'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/applyGroup.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

  });
  const testobj = {
    name: '单元测试',
    orderBy: 10,
    companyId: 1,
    sys_adder: 1,
    sys_updator: 1
  };
  // 新建applyGroup接口
  it('should POST /api/ApplyGroups', () => {
    return app
      .httpRequest()
      .post('/api/ApplyGroups')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        testobj.id = body.id;
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
        assert(body.sys_addTime);
      })
      .expect(200);
  });

  // 修改applyGroup接口
  it('should PATCH /api/ApplyGroups/:id', () => {
    testobj.name = '单元测试123';
    return app
      .httpRequest()
      .patch(`/api/ApplyGroups/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
        assert(body.sys_updateTime);
      })
      .expect(200);
  });

  // 查询applyGroup列表接口
  it('should GET /api/ApplyGroups', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/ApplyGroups/?limit=4&offSet=0'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询applyGroup对象接口
  it('should GET /api/ApplyGroups/:id', () => {
    return app
      .httpRequest()
      .get(`/api/ApplyGroups/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
      });
  });

  // 删除applyGroup对象接口
  it('should DELETE /api/ApplyGroups/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/ApplyGroups/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
