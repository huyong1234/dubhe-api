'use strict';

const { app, assert } = require('egg-mock/bootstrap');
describe('test/app/controller/notice.test.js', () => {
  it('should assert', function*() {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });
  const testobj = {
    name: '单元测试',
    partition: 1,
    noticeTypeId: 1,
    title: '测试通知',
    abstract: '这是一个摘要',
    imgId: '123456',
    substance: '这是通知的具体内容',
    status: 1,
    sys_adder: 1,
    sys_updator: 1
  };
  const contents = {
    abstract: testobj.abstract,
    imgId: testobj.imgId,
    substance: testobj.substance
  };
  // 新建通知接口
  it('should POST /api/Notices', () => {
    return app
      .httpRequest()
      .post('/api/Notices')
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        testobj.id = body.id;
        assert(body.noticeTypeId, testobj.noticeTypeId);
        assert(body.title, testobj.title);
        assert(body.contents, contents);
        assert(body.status, testobj.status);
        assert(body.sys_addTime);
        assert(body.sys_updateTime);
        assert(body.sys_adder, testobj.sys_adder);
      })
      .expect(200);
  });

  // 修改通知接口
  it('should PATCH /api/Notices/:id', () => {
    testobj.abstract = '修改通知摘要';
    return app
      .httpRequest()
      .patch(`/api/Notices/${testobj.id}`)
      .type('form')
      .send(testobj)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.noticeTypeId, testobj.noticeTypeId);
        assert(body.title, testobj.title);
        assert(body.contents, contents);
        assert(body.status, testobj.status);
        assert(body.sys_addTime);
        assert(body.sys_updateTime);
        assert(body.sys_adder, testobj.sys_adder);
        assert(body.sys_updator, testobj.sys_updator);
      })
      .expect(200);
  });

  // 查询通知列表接口
  it('should GET /api/Notices', () => {
    return (
      app
        .httpRequest()
        // 用encodeURI()方法对url进行转码
        .get(encodeURI('/api/Notices/?limit=4&offSet=0&companyId=1'))
        .expect((res) => {
          const { body } = res;
          assert(body);
          assert(body instanceof Object);
          assert(body.length <= 4);
        })
        .expect(200)
    );
  });

  // 查询通知对象接口
  it('should GET /api/Notices/:id', () => {
    return app
      .httpRequest()
      .get(`/api/Notices/${testobj.id}`)
      .expect(200)
      .expect((res) => {
        const { body } = res;
        // 测试返回字段
        assert(body);
        assert(body.id);
        assert(body.noticeTypeId, testobj.noticeTypeId);
        assert(body.title, testobj.title);
        assert(body.contents, contents);
        assert(body.status, testobj.status);
        assert(body.sys_addTime);
        assert(body.sys_updateTime);
        assert(body.sys_adder, testobj.sys_adder);
        assert(body.sys_updator, testobj.sys_updator);
      });
  });

  // 删除通知对象接口
  it('should DELETE /api/Notices/:id', () => {
    return app
      .httpRequest()
      .delete(`/api/Notices/${testobj.id}`)
      .expect({})
      .expect(204);
  });
});
