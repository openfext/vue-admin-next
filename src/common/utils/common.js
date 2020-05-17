import { Constants } from '../config';

const CommonUtil = {
  isSuccess(data = {}) {
    const code = typeof data === 'string' ? data : data.code;
    return code != null ? code === Constants.SUCCESS_CODE : true;
  },

  getInitialState() {
    const state = {
      global: {}
    };

    if (typeof window !== 'undefined') {
      return window.__INITIAL_STATE__ || state;
    }

    return state;
  },

  gotoUrl(url) {
    window.location.href = url;
  },

  gotoLoginUrl(from = '') {
    CommonUtil.gotoUrl(`/login?url=${from}`);
  }
};

export default CommonUtil;
