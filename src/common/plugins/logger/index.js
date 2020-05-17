import Log from '@/base/log';

const install = function(Vue, options) {
  Vue.mixin({
    beforeCreate: function() {
      const vm = this;
      const loggerName = vm.$options._componentTag || 'vm';

      vm.$logger = Log.createLogger({
        tag: loggerName
      });
    }
  });
};

export default {
  name: 'logger',

  install
};
