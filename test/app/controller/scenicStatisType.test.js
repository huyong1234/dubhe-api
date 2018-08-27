'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/scenicStatisTypes.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

  });
  const testobj = {
    scenicId: 1,
    parentId: 10,
    name: '测试数据',
    orderBy: 1,
    icon: '123321',
    sys_adder: 1,
    sys_updator: 2
  };
  // 新建ScenicStatisTypes接口
  it('should POST /api/ScenicStatisTypes', () => {
    return app
      .httpRequest()
      .post('/api/ScenicStatisTypes')
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
        assert(body.icon, testobj.icon);
      })
      .expect(200);
  });

  // 修改ScenicStatisTypes接口
  it('should PATCH /api/ScenicStatisTypes/:id', () => {
    testobj.name = '单元数据123';
    return app
      .httpRequest()
      .patch(`/api/ScenicStatisTypes/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
        assert(body.icon, testobj.icon);
      })
      .expect(200);
  });

  // 查询ScenicStatisTypes列表接口
  it('should GET /api/ScenicStatisTypes', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/ScenicStatisTypes/?limit=4&offSet=0&scenicId=1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询ScenicStatisTypes对象接口
  it('should GET /api/ScenicStatisTypes/:id', () => {
    return app
      .httpRequest()
      .get(`/api/ScenicStatisTypes/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id, testobj.id);
        assert(body.name, testobj.name);
        assert(body.orderBy, testobj.orderBy);
        assert(body.icon, testobj.icon);
      });
  });

  // 删除ScenicStatisTypes对象接口
  it('should DELETE /api/ScenicStatisTypes/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/ScenicStatisTypes/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
