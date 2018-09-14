'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/NoticesHistory.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    noticeId: 1,
    department:
      '[{"id":1078,"departmentname":"总经办"},{"id":1079,"departmentname":"行政人事部"}]',
    companyId: 1,
    sys_adder: 1
  };
  // 发送通知接口
  it('should POST /api/NoticesHistory', () => {
    return app
      .httpRequest()
      .post('/api/NoticesHistory')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
      })
      .expect(200);
  });

  // 查询发送通知历史列表接口
  it('should GET /api/NoticesHistory', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/NoticesHistory/?limit=4&offSet=0&companyId=1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Array);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询发送通知历史对象接口
  it('should GET /api/NoticesHistory/:id', () => {
    return app
      .httpRequest()
      .get(`/api/NoticesHistory/${testobj.noticeId}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.notice.id, testobj.noticeId);
        assert(body.department, testobj.department);
        assert(body.sys_addTime);
        assert(body.sys_updateTime);
        assert(body.sys_adder, testobj.sys_adder);
      });
  });
});
