export default function(Vue, { useModels = false } = {}) {
  Vue.prototype.$dataflow = function() {
    const rootVM = this.$root;

    return rootVM.$options.dataflow;
  };

  Vue.mixin({
    beforeCreate: function() {
      const vm = this;
      const dataflow = this.$dataflow();

      if (dataflow) {
        if (useModels) {
          vm.$models = dataflow.models;
        }
        vm.$dao = dataflow.dao;
        vm.$services = dataflow.services;
      }
    }
  });
}
