'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/dataLatitudes.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    scenicId: 1,
    parentId: 1,
    name: '单元测试',
    subName: 1,
    orderBy: 10,
    sys_adder: 1,
    sys_updator: 1
  };
  // 新建dataLatitudes接口
  it('should POST /api/DataLatitudes', () => {
    return app
      .httpRequest()
      .post('/api/DataLatitudes')
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
      })
      .expect(200);
  });

  // 修改dataLatitudes接口
  it('should PATCH /api/DataLatitudes/:id', () => {
    testobj.name = '单元测试123';
    return app
      .httpRequest()
      .patch(`/api/DataLatitudes/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
      })
      .expect(200);
  });

  // 查询dataLatitudes列表接口
  it('should GET /api/DataLatitudes', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/DataLatitudes/1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length >= 0);
        })
        .expect(200)
    );
  });

  // 删除dataLatitudes对象接口
  it('should DELETE /api/DataLatitudes/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/DataLatitudes/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
