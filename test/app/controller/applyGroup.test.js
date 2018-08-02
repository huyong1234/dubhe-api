'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/applyGroup.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });
  // 新建applyGroup接口
  it('should POST /api/ApplyGroups', () => {
    return app
      .httpRequest()
      .post('/api/ApplyGroups')
      .type('form')
      .send({
        name: '测试管理345',
        oderBy: 10,
        companyId: '1'
      })
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body.id);
        assert(body.name === '测试管理345');
        assert(body.orderBy === 10);
        assert(body.sys_addTime);
      })
      .expect(200);
  });

  // 修改applyGroup接口
  it('should PATCH /api/ApplyGroups/:id', () => {
    return (
      app
        .httpRequest()
        .patch('/api/ApplyGroups/15')
        .type('form')
        .send({
          name: '测试管理123',
          oderBy: 7,
          companyId: '1'
        })
        .expect((res) => {
          const { body } = res;
          // 测试返回字段
          assert(body.id);
          assert(body.name, '测试管理123');
          assert(body.orderBy, 7);
          assert(body.sys_updateTime);
        })
        .expect(200)
    );
  });

  // 查询applyGroup列表接口
  it('should GET /api/ApplyGroups', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/ApplyGroups/?limit=4&offSet=0&name=测试管理1'))
        .expect([
          { id: 16, name: '测试管理1', oderBy: 8 },
          { id: 17, name: '测试管理1', oderBy: 8 },
          { id: 18, name: '测试管理1', oderBy: 8 }
        ])
        .expect(200)
    );
  });

  // 查询applyGroup对象接口
  it('should GET /api/ApplyGroups', () => {
    return app
      .httpRequest()
      .get('/api/ApplyGroups/16')
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body.id);
        assert(body.name === '测试管理2');
        assert(body.orderBy === 9);
      });
  });

  // 删除applyGroup对象接口
  it('should DELETE /api/ApplyGroups/:id', () => {
    return app
      .httpRequest()
      .delete('/api/ApplyGroups/32')
      .expect({})
      .expect(204);
  });
});
