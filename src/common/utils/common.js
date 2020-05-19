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

  joinURL(baseURL = '', url = '') {
    const len = baseURL.length;

    if (!len) {
      return url;
    }

    if (baseURL[len - 1] === '/') {
      baseURL = baseURL.slice(0, len - 1);
    }

    return baseURL + url;
  },

  gotoURL(url) {
    window.location.href = url;
  },

  gotoPath(path) {
    const url = CommonUtil.joinURL(process.env.BASE_URL, path);

    CommonUtil.gotoURL(url);
  },

  gotoLoginURL(from = '') {
    CommonUtil.gotoPath(`/login?url=${from}`);
  }
};

export default CommonUtil;
