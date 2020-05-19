export default function AuthInterceptor(store) {
  return function(to, from, next) {
    const requiresAuthNext = function() {
      if (store.getters.isLoginedUser) {
        next();
      } else {
        next('/login');
      }
    };

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.user || !store.getters.user.id) {
        store.dispatch('setGlobalAppData').then(() => {
          requiresAuthNext();
        });
      } else {
        requiresAuthNext();
      }

      // requiresAuthNext();
    } else {
      next();
    }
  };
}
