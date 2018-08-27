'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/roleApplies.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    roleId: 1,
    applyId: 5,
    applyOrderBy: 1,
    applyGroupId: 3,
    applyGroupOrderBy: 1,
    sys_adder: 1,
    sys_updator: 1
  };
  // 新建权限接口
  it('should POST /api/RoleApplies', () => {
    return app
      .httpRequest()
      .post('/api/RoleApplies')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.roleId, testobj.roleId);
        assert(body.applyId, testobj.applyId);
        assert(body.applyOrderBy, testobj.applyOrderBy);
        assert(body.applyGroupId, testobj.applyGroupId);
      })
      .expect(200);
  });

  // 查询权限列表接口
  it('should GET /api/RoleApplies/:id', () => {
    return (
      app
        .httpRequest()
        // 如果有中文要用encodeURI()方法对url进行转码
        .get(`/api/RoleApplies/${testobj.roleId}`)
        // .get('/api/RoleApplies/4')
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length >= 1);
        })
        .expect(200)
    );
  });

  // 删除权限接口
  it('should DELETE /api/RoleApplies/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/RoleApplies/${testobj.applyId}/?roleId=${testobj.roleId}&applyGroupId=${testobj.applyGroupId}&sys_updator=${testobj.sys_updator}`)
      .expect({})
      .expect(204);
  });
});
