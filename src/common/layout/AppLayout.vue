<template>
  <div class="app-layout app-layout-default-theme" :class="layoutClasses">
    <el-container>
      <el-aside
        :width="ui.isAsideCollapsed ? '64px' : '256px'"
        :class="{ 'el-aside-collapsed': ui.isAsideCollapsed }"
      >
        <app-aside></app-aside>
      </el-aside>
      <el-container>
        <el-header>
          <app-header></app-header>
        </el-header>
        <el-main>
          <app-content>
            <transition name="page-switch" mode="out-in">
              <keep-alive :include="cachedSessions" :max="20">
                <router-view :key="routerViewKey" />
              </keep-alive>
            </transition>
          </app-content>
        </el-main>
        <el-footer>
          <app-footer></app-footer>
        </el-footer>
      </el-container>
    </el-container>
    <el-backtop :bottom="50"></el-backtop>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  box-sizing: border-box;
  min-height: 100vh;

  ::v-deep * {
    box-sizing: border-box;
  }

  .el-container {
    min-height: 100vh;

    .el-aside {
      position: relative;
      overflow: visible;
      z-index: 50;
      width: 256px;
      transition: 0.3s width ease-in-out;
      box-shadow: 2px 0 8px 0 rgba(0, 0, 0, 0.05);

      & .el-aside-collapsed {
        width: 64px;
      }
    }

    .el-header {
      position: relative;
      z-index: 10;
      padding: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    .el-main {
      padding: 0;
    }

    .el-footer {
      padding: 0;
    }
  }

  .page-switch-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .page-switch-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .page-switch-leave-active,
  .page-switch-enter-active {
    transition: all 0.5s;
  }
}
</style>

<script>
import { mapState } from 'vuex';
import AppAside from './aside/AppAside';
import AppHeader from './header/AppHeader';
import AppContent from './content/AppContent';
import AppFooter from './footer/AppFooter';

export default {
  name: 'app-layout',

  components: {
    AppAside,
    AppHeader,
    AppContent,
    AppFooter
  },

  computed: {
    ...mapState({
      ui(state) {
        return state.ui || {};
      },

      preference(state) {
        return state.preference || {};
      },

      cachedSessions(state) {
        return state.cachedSessions || [];
      }
    }),

    routerViewKey() {
      return this.$route.path;
    },

    layoutClasses() {
      return this.preference.themeLightMode
        ? {
            'app-layout-default-theme-light': true
          }
        : {
            'app-layout-default-theme-dark': true
          };
    }
  },

  data() {
    return {};
  }
};
</script>
