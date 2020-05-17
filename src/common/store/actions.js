import types from './mutationTypes';

export const actions = {
  async updateUIStatus({ commit, state }, ui) {
    const nextUI = {
      ...state.ui,
      ...ui
    };

    commit(types.SET_UI_STATUS, nextUI);
  },

  async updateUserPreference({ commit, state }, preference) {
    const nextPreference = {
      ...state.preference,
      ...preference
    };

    commit(types.SET_USER_PREFERENCE, nextPreference);
  },

  async setGlobalAppData({ commit }, data) {
    const { dataflow } = this;
    try {
      const appUserInfo =
        data ||
        (await dataflow.dao.commonDao.getAppUserInfo().then(json => json.data));
      const { global = {} } = appUserInfo;

      dataflow.services.userService.setUser(global.user);
      dataflow.services.authService.setAuthList(global.auth);

      commit(types.SET_GLOBAL_APP_DATA, global);
    } catch (e) {
      commit(types.SET_GLOBAL_APP_DATA, {});
    }
  },

  async removeGlobalAppData({ commit }) {
    const { dataflow } = this;

    dataflow.services.userService.setUser({});
    dataflow.services.authService.setAuthList([]);

    commit(types.SET_GLOBAL_APP_DATA, {});

    await dataflow.dao.commonDao.logout();
  },

  async addSession({ commit, dispatch, state }, route) {
    const { path, fullPath, meta = {} } = route;
    const { breadcrumbs = [], name = '', tab = true } = meta;

    let title = meta.title;

    if (!title) {
      const breadcrumb = breadcrumbs[breadcrumbs.length - 1];

      if (breadcrumb) {
        title = breadcrumb.text || breadcrumb;
      } else {
        title = 'TabView';
      }
    }

    if (name) {
      dispatch('addCachedSession', name);
    }

    if (tab) {
      commit(types.ADD_SESSION, {
        path,
        fullPath,
        name,
        title
      });
    }
  },

  async delSession({ commit, dispatch, state }, route) {
    const isString = typeof route === 'string';
    const path = isString ? route : route.path;
    const sessionRecord = state.sessions.find(item => item.path === path);

    if (!sessionRecord) {
      return;
    }

    if (sessionRecord.name) {
      dispatch('delCachedSession', sessionRecord.name);
    }

    commit(types.DEL_SESSION, {
      path
    });
  },

  async delAllSession({ commit, dispatch, state }) {
    dispatch('delAllCachedSession');
    commit(types.DEL_ALL_SESSION);
  },

  async delOtherSession({ commit, dispatch, state }, route) {
    const isString = typeof route === 'string';
    const path = isString ? route : route.path;
    const sessionRecord = state.sessions.find(item => item.path === path);

    if (!sessionRecord) {
      return;
    }

    if (sessionRecord.name) {
      dispatch('delOtherCachedSession', sessionRecord.name);
    }

    commit(types.DEL_OTHER_SESSION, {
      path
    });
  },

  async addCachedSession({ commit, state }, key) {
    commit(types.ADD_CACHED_SESSION, {
      key
    });
  },

  async delCachedSession({ commit, state }, key) {
    commit(types.DEL_CACHED_SESSION, {
      key
    });
  },

  async delAllCachedSession({ commit, state }) {
    commit(types.DEL_ALL_CACHED_SESSION);
  },

  async delOtherCachedSession({ commit, state }, key) {
    commit(types.DEL_OTHER_CACHED_SESSION, {
      key
    });
  }
};
