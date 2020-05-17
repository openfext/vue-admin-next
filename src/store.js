import Vuex from 'vuex';
import * as GlobalStore from '@/common/store';
import { AppModules } from './modules';
import { dataflowVuexPlugin } from './dataflow';

const stores = AppModules.reduce((pre, cur) => {
  return {
    ...pre,
    ...cur.stores
  };
}, {});

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  ...GlobalStore,

  modules: {
    ...stores
  },

  plugins: [dataflowVuexPlugin]
});
