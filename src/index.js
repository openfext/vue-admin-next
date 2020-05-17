import '@/common/entry';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import store from './store';
import dataflow from './dataflow';
import plugins from './plugins';

Vue.use(plugins);

/* keep vue-router and vuex store in sync */
sync(store, router);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  dataflow,
  render: h => h(App)
}).$mount('#app');
