import { merge } from 'lodash';
import { CommonUtil } from '@/common/utils';

const state = {
  // app global ui status
  ui: {
    appName: 'Vue Admin Next',

    submenuMaxLevel: 3,

    isAsideCollapsed: false,

    isDrawerVisible: false
  },

  // user preference
  preference: {
    useBreadcrumb: true,
    useTabView: false,
    themeLightMode: false
  },

  // app router-view sessions
  sessions: [],
  cachedSessions: [],

  global: {
    env: 'DEV',
    serverIP: 'LOCAL',
    user: {},
    auth: []
  }
};

// state from server render
merge(state, CommonUtil.getInitialState());

export { state };
