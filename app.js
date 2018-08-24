'use strict';

module.exports = (app) => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    if (app.validator) {
      app.validator.addRule('int', (rule, value) => {
        try {
          value = parseInt(value);
          if (typeof value !== 'number' || value % 1 !== 0) {
            return this.t('should be an integer');
          }

          if (rule.hasOwnProperty('max') && value > rule.max) {
            return this.t('should smaller than %s', rule.max);
          }

          if (rule.hasOwnProperty('min') && value < rule.min) {
            return this.t('should bigger than %s', rule.min);
          }
        } catch (err) {
          return 'must be int string';
        }
      });
    }
  });
};
