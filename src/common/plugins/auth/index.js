import AuthProvider from './provider/AuthProvider';

const install = function(Vue, options = {}) {
  Vue.component('auth-provider', AuthProvider);
};

export default {
  name: 'auth',

  install
};
