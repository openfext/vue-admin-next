<template>
  <div class="app-layout-header">
    <span class="app-layout-header-switcher" @click="switchAside">
      <i v-if="ui.isAsideCollapsed" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </span>

    <div class="app-layout-header-menu">
      <el-tooltip content="站点搜索，暂未开放" placement="bottom-end">
        <span class="app-layout-header-menu-item">
          <i class="el-icon-search"></i>
        </span>
      </el-tooltip>
      <el-tooltip content="帮助文档" placement="bottom-end">
        <a
          class="app-layout-header-menu-item"
          target="_blank"
          href="https://openfext.github.io/docs/zh/vue-admin-next/intro.html"
        >
          <i class="el-icon-help"></i>
        </a>
      </el-tooltip>
      <el-dropdown
        class="app-layout-header-menu-item app-layout-header-menu-item-avatar"
        @command="handleUserCommand"
      >
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="avatar"></el-avatar>
          <span>{{ user.name }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled icon="el-icon-user"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item
            divided
            command="logout"
            icon="el-icon-switch-button"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <span class="app-layout-header-menu-item" @click="openDrawer">
        <i class="el-icon-setting"></i>
      </span>
    </div>

    <app-drawer></app-drawer>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-header {
  position: relative;
  height: 100%;
  line-height: 60px;
  background: #fff;

  .app-layout-header-switcher {
    cursor: pointer;
    height: 60px;
    padding: 20px;
    font-size: 20px;
  }

  .app-layout-header-menu {
    float: right;
    height: 100%;
    overflow: hidden;

    a {
      color: inherit;
    }

    .app-layout-header-menu-item {
      display: inline-block;
      padding: 0 12px;
      height: 100%;
      vertical-align: top;
      transition: all 0.3s;
      outline: none;

      &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.05);
      }

      [class^='el-icon-'] {
        padding: 20px 0;
        font-size: 20px;
      }

      &.el-dropdown {
        padding: 0;

        .el-dropdown-link {
          height: 100%;
          padding: 0 12px;
          display: inline-block;
        }
      }
    }

    .app-layout-header-menu-item-avatar {
      .el-avatar {
        vertical-align: top;
        margin: 12px 8px 12px 0;
      }
    }
  }
}
</style>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import defaultAvatarImg from '@/static/images/avatar.png';
import AppDrawer from './AppDrawer';

export default {
  name: 'app-header',

  components: {
    AppDrawer
  },

  computed: {
    ...mapGetters(['isLoginedUser']),

    ...mapState({
      ui(state) {
        return state.ui || {};
      },

      user(state) {
        return state.global.user || {};
      }
    }),

    avatar() {
      return this.user.avatar || this.defaultAvatarImg;
    }
  },

  data() {
    return {
      defaultAvatarImg
    };
  },

  methods: {
    ...mapActions(['removeGlobalAppData', 'updateUIStatus']),

    switchAside() {
      this.updateUIStatus({
        isAsideCollapsed: !this.ui.isAsideCollapsed
      });
    },

    openDrawer() {
      this.updateUIStatus({
        isDrawerVisible: true
      });
    },

    handleUserCommand(command) {
      switch (command) {
        case 'logout':
          this.logout();
          break;
        default:
          break;
      }
    },

    logout() {
      this.removeGlobalAppData().then(() => {
        this.$router.push('/login');
      });
    }
  }
};
</script>
