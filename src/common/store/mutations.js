import types from './mutationTypes';

export const mutations = {
  [types.SET_UI_STATUS](state, ui) {
    state.ui = ui;
  },

  [types.SET_USER_PREFERENCE](state, preference) {
    state.preference = preference;
  },

  [types.SET_GLOBAL_APP_DATA](state, global) {
    state.global = global;
  },

  [types.ADD_SESSION](state, session) {
    const sessionRecord = state.sessions.find(
      item => item.path === session.path
    );
    if (!sessionRecord) {
      state.sessions.push(session);
    } else {
      Object.assign(sessionRecord, session);
    }
  },

  [types.DEL_SESSION](state, session) {
    const index = state.sessions.findIndex(item => item.path === session.path);

    if (index >= -1) {
      state.sessions.splice(index, 1);
    }
  },

  [types.DEL_ALL_SESSION](state) {
    state.sessions = [];
  },

  [types.DEL_OTHER_SESSION](state, session) {
    state.sessions = state.sessions.filter(item => item.path === session.path);
  },

  [types.ADD_CACHED_SESSION](state, { key }) {
    if (!state.cachedSessions.includes(key)) {
      state.cachedSessions.push(key);
    }
  },

  [types.DEL_CACHED_SESSION](state, { key }) {
    state.cachedSessions = state.cachedSessions.filter(item => item !== key);
  },

  [types.DEL_ALL_CACHED_SESSION](state) {
    state.cachedSessions = [];
  },

  [types.DEL_OTHER_CACHED_SESSION](state, { key }) {
    state.cachedSessions = state.cachedSessions.filter(item => item === key);
  }
};
