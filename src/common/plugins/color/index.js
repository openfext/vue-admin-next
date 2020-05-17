function install(Vue, { fallback } = {}) {
  Vue.directive('color', {
    inserted: function(el, bindings, vnode) {
      const value = bindings.value || fallback || 'inherit';

      el.style.color = `${value}`;
    }
  });
}

export default {
  name: 'color',

  install
};
