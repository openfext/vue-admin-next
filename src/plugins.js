import CommonModule from '@/common';

const CONFIG = {
  color: {
    fallback: 'green'
  }
};

export default {
  install(Vue, config) {
    config = Object.assign({}, CONFIG, config);

    CommonModule.plugins.forEach(p => {
      const conf = p.name ? config[p.name] || {} : {};

      Vue.use(p, conf);
    });
  }
};
