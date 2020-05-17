import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import ApplicationUI from '@/common/components/ui';

Vue.use(VueCompositionApi);

Vue.use(Vuex);

Vue.use(VueRouter);

Vue.use(ElementUI);

Vue.use(ApplicationUI);

Vue.config.productionTip = false;
