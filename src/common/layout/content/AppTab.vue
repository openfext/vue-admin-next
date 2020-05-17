<template>
  <div class="app-layout-content-tab">
    <el-tabs
      :closable="sessions.length > 1"
      v-model="activeSessionPath"
      @tab-click="gotoTabView"
      @tab-remove="delTabView"
    >
      <el-tab-pane
        v-for="item in sessions"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown
      class="app-layout-content-tab-menu"
      trigger="click"
      @command="handleTabMenu"
    >
      <span class="app-layout-content-tab-menu-icon">
        <i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="refresh-current" icon="el-icon-refresh">
          刷新页面
        </el-dropdown-item>
        <el-dropdown-item
          divided
          command="close-other"
          :disabled="sessions.length <= 1"
          icon="el-icon-close"
        >
          关闭其它
        </el-dropdown-item>
        <el-dropdown-item
          command="close-all"
          :disabled="sessions.length <= 1"
          icon="el-icon-folder-delete"
        >
          全部关闭
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/themes/default/variables/index';

$--app-tab-height: 40px;

.app-layout-content-tab ::v-deep {
  position: relative;
  height: $--app-tab-height;
  line-height: $--app-tab-height;
  padding-right: 30px;

  .el-tabs {
    .el-tabs__header {
      margin: 0;
    }

    .el-tabs__nav-wrap {
      padding: 0 20px;
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      font-size: 16px;
      line-height: $--app-tab-height;
    }

    .el-tabs__item {
      font-size: 12px;
    }
  }

  .app-layout-content-tab-menu {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    font-size: 16px;

    .app-layout-content-tab-menu-icon {
      display: inline-block;
      height: 100%;
      width: 30px;
      padding: 0 5px;
    }

    &:hover {
      cursor: pointer;
      color: $--color-primary;
      background-color: rgba(0, 0, 0, 0.05);
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #e4e7ed;
      z-index: 1;
    }
  }
}
</style>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'app-tab',

  computed: {
    ...mapState({
      sessions(state) {
        return state.sessions || [];
      }
    }),

    activeSession() {
      const { sessions, activeSessionPath } = this;

      return sessions.find(item => item.path === activeSessionPath);
    }
  },

  data() {
    return {
      activeSessionPath: ''
    };
  },

  watch: {
    $route(value, oldValue) {
      this.addTabView();
    }
  },

  mounted() {
    this.addTabView();
  },

  methods: {
    ...mapActions([
      'addSession',
      'delSession',
      'delAllSession',
      'delOtherSession',

      'delCachedSession'
    ]),

    handleTabMenu(command) {
      switch (command) {
        case 'refresh-current':
          this.refreshCurrentTabView();
          break;
        case 'close-other':
          this.delOtherTabView();
          break;
        case 'close-all':
          this.delAllTabView();
          break;
        default:
          break;
      }
    },

    getRefreshPath(path = '/') {
      const base64Path = window.btoa(path);

      return `/refresh/${base64Path}`;
    },

    refreshCurrentTabView() {
      const { activeSession } = this;

      this.delCachedSession(activeSession.name).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: this.getRefreshPath(activeSession.fullPath)
          });
        });
      });
    },

    getNextSession(target) {
      const { sessions } = this;
      const index = sessions.findIndex(item => item.path === target);

      return sessions[index + 1] || sessions[index - 1] || { fullPath: '/' };
    },

    addTabView() {
      const { $route } = this;

      this.activeSessionPath = $route.path;
      this.addSession($route);
    },

    delTabView(target) {
      const { $router, activeSessionPath } = this;
      const nextSession = this.getNextSession(target);

      this.delSession(target);
      if (activeSessionPath === target) {
        // make sure cached sessions was removed
        this.$nextTick(() => {
          $router.push(nextSession.fullPath);
        });
      }
    },

    delOtherTabView() {
      const { activeSession } = this;

      this.delOtherSession(activeSession);
    },

    delAllTabView() {
      this.delAllSession();
      this.$router.replace({
        path: this.getRefreshPath('/')
      });
    },

    gotoTabView() {
      const { $route, $router, activeSession, activeSessionPath } = this;

      if ($route.path !== activeSessionPath) {
        $router.push(activeSession.fullPath);
      }
    }
  }
};
</script>
