import VueRouter from 'vue-router';

class Router {
  router = null;

  constructor(options = {}) {
    this.init(options);
  }

  init(options) {
    const { config, hooks } = options;

    this.router = new VueRouter(
      Object.assign(
        {
          mode: 'history'
        },
        config
      )
    );

    this.initHooks(hooks);
  }

  initHooks(hooks = {}) {
    const hookNames = 'afterEach beforeEach beforeResolve';

    hookNames.split(' ').forEach(hookName => {
      const hookFn = this.router[hookName];
      if (hookFn && typeof hookFn === 'function') {
        const hookCallbacks = hooks[hookName] || [];

        hookCallbacks.forEach(cb => {
          if (typeof cb === 'function') {
            hookFn.call(this.router, cb);
          }
        });
      }
    });
  }

  eject() {
    return this.router;
  }
}

export default Router;
