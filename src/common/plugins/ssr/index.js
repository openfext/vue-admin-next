const install = function(Vue, options = {}) {
  const { outClass = 'fade-out' } = options;

  Vue.renderAppNode = function() {
    const appNode = document.getElementById('app');
    const ssrNode = document.getElementById('server-app');

    if (!appNode || !ssrNode) {
      return;
    }

    if (!appNode.children.length) {
      window.requestAnimationFrame(Vue.renderAppNode);
    } else {
      ssrNode.classList.add(outClass);
      ssrNode.addEventListener('transitionend', () => {
        ssrNode.remove();
      });
    }
  };

  Vue.renderAppNode();
};

export default {
  name: 'ssr',

  install
};
