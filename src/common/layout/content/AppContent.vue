<template>
  <div class="app-layout-content">
    <div class="app-layout-content-grid app-layout-content-header">
      <app-tab v-if="preference.useTabView" />
    </div>
    <div class="app-layout-content-grid app-layout-content-body">
      <app-breadcrumb v-if="preference.useBreadcrumb" />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-content {
  .app-layout-content-grid {
    overflow: hidden;
    transition: 0.3s;
  }

  .app-layout-content-header {
    margin: 0;
    background-color: #fff;
    position: relative;
  }

  .app-layout-content-body {
    margin: 20px;
  }
}
</style>

<script>
import { mapState } from 'vuex';
import AppBreadcrumb from './AppBreadcrumb';
import AppTab from './AppTab';

export default {
  name: 'app-content',

  components: {
    AppTab,
    AppBreadcrumb
  },

  computed: {
    ...mapState({
      preference(state) {
        return state.preference || {};
      }
    })
  },

  data() {
    return {};
  }
};
</script>
