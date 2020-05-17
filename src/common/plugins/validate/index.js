import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from 'vee-validate/dist/vee-validate.full';

import './rules';
import VeeLocale from './locale';

const install = function(Vue, { locale = 'zh' } = {}) {
  localize(VeeLocale);

  localize(locale);

  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);
};

export default {
  name: 'validate',

  localize,
  extend,
  install
};
