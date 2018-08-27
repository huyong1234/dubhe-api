'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/roleScenicStatis.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    roleId: 1,
    sys_adder: 1,
    sys_updator: 1,
    scenicStatisId: 1,
    scenicStatisOrderBy: 1,
    scenicStatisTypeId: 1,
    scenicStatisTypeOrderBy: 1
  };
  // 新建权限接口
  it('should POST /api/RoleScenicStatis', () => {
    return app
      .httpRequest()
      .post('/api/RoleScenicStatis')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        testobj.scenicStatisOrderBy = body.scenicStatisOrderBy;
        assert(body.roleId, testobj.roleId);
        assert(body.scenicStatisId, testobj.scenicStatisId);
        assert(body.scenicStatisOrderBy, testobj.scenicStatisOrderBy);
      })
      .expect(200);
  });

  // 查询权限列表接口
  it('should GET /api/RoleScenicStatis/:id', () => {
    return (
      app
        .httpRequest()
        // 如果有中文要用encodeURI()方法对url进行转码
        .get(`/api/RoleScenicStatis/${testobj.roleId}`)
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
  it('should DELETE /api/RoleScenicStatis/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/RoleScenicStatis/${testobj.scenicStatisId}/?roleId=${testobj.roleId}&scenicStatisTypeId=${testobj.scenicStatisTypeId}&sys_updator=${testobj.sys_updator}`)
      .expect({})
      .expect(204);
  });
});
