export default function URIAuthInterceptor(store) {
  return function(to, from, next) {
    const { matched, path } = to;
    const record = matched[matched.length - 1];

    if (record) {
      const requiresURIAuth = record.meta.requiresURIAuth;
      const dataflow = store.dataflow;

      if (requiresURIAuth) {
        if (dataflow.services.authService.hasURIAuth(path)) {
          next();
        } else {
          next('/error/403');
        }
      } else {
        next();
      }
    } else {
      next();
    }
  };
}
