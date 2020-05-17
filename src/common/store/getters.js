export const getters = {
  // global getters
  user(state) {
    return state.global.user;
  },

  isLoginedUser(state) {
    let global = state.global || {};
    let user = global.user;

    return !!(user && user.id && Number(user.id) > 0);
  }
};
