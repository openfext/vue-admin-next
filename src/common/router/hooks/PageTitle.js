const getPageTitle = function(breadcrumbs, appName = 'Admin Application') {
  let titles = [appName].concat(breadcrumbs);

  titles = titles.map(t => {
    if (typeof t !== 'string') {
      return t.text || 'Blank';
    }
    return t;
  });

  return titles.reverse().join('_');
};

export default function PageTitle(store) {
  return function(to, from, next) {
    const matchedList = to.matched;
    const appName = store.state.ui.appName;

    matchedList
      .filter(record => record.meta.breadcrumbs)
      .forEach(record => {
        window.document.title = getPageTitle(record.meta.breadcrumbs, appName);
      });

    if (next) {
      next();
    }
  };
}
