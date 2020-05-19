<template>
  <div class="app-layout-aside">
    <div class="app-layout-aside-logo">
      <router-link to="/">
        <img :src="logoImg" />
        <h1>{{ ui.appName }}</h1>
      </router-link>
    </div>
    <el-menu
      :default-active="currentNav"
      :unique-opened="false"
      :collapse="ui.isAsideCollapsed"
    >
      <sub-menu
        v-for="block in authorizedNav"
        :key="block.key"
        :block="block"
        :maxLevel="ui.submenuMaxLevel"
      ></sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/themes/default/variables/index';

$--app-dark-theme-bg-color: #001529;
$--app-dark-theme-text-color: #c7c7c7;
$--app-dark-theme-menu-active-color: #000c17;
$--app-dark-theme-menu-hover-color: #000c17;

.app-layout-aside {
  min-height: 100%;
  background-color: #fff;
  transition: all 0.3s ease-in-out;

  .app-layout-aside-logo {
    z-index: 60;
    position: relative;
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    padding-left: 12px;
    box-shadow: 1px 1px 0 0 #e8e8e8;
    transition: box-shadow 0.3s;

    img {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      border-radius: 4px;
    }

    a {
      color: $--color-primary;
      transition: color 0.5s;

      h1 {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0 0 12px;
        font-size: 20px;
        font-weight: 400;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      }
    }
  }

  .el-menu {
    padding-top: 10px;
    width: 256px;
    border-right: 0;

    &.el-menu--collapse ::v-deep {
      width: 64px;

      .el-submenu.el-menu-main-module {
        & > .el-submenu__title {
          padding-left: 20px !important;
        }
      }
    }

    &.v-leave-to ::v-deep {
      .el-submenu {
        .el-menu {
          opacity: 0;
        }
      }
    }

    &.v-leave-active ::v-deep {
      .el-submenu {
        .el-menu {
          transition: opacity 0.3s;
        }
      }
    }
  }

  ::v-deep .el-menu {
    background-color: transparent;
  }

  ::v-deep .el-menu--vertical .el-menu {
    background-color: #fff;
  }
}

.app-layout-default-theme-dark {
  .app-layout-aside {
    background-color: $--app-dark-theme-bg-color;

    .app-layout-aside-logo {
      box-shadow: none;

      a {
        color: #fff;
      }
    }

    ::v-deep .el-menu {
      .el-submenu__title {
        color: $--app-dark-theme-text-color;

        &:hover,
        &:focus {
          background-color: $--app-dark-theme-menu-hover-color;
        }
      }

      .el-menu-item {
        color: $--app-dark-theme-text-color;

        &.is-active {
          color: $--color-primary;
        }

        &:hover,
        &:focus {
          background-color: $--app-dark-theme-menu-hover-color;
        }
      }
    }

    ::v-deep .el-menu--vertical .el-menu {
      background-color: $--app-dark-theme-bg-color;
    }
  }
}
</style>

<script>
import { mapState } from 'vuex';
import { Nav as NavConfig } from '@/common/config';
import logoImg from '@/static/images/logo.png';
import SubMenu from './menu/SubMenu';
import NavUtil from './utils/nav';

export default {
  name: 'app-aside',

  components: {
    SubMenu
  },

  computed: {
    ...mapState({
      ui(state) {
        return state.ui || {};
      },

      preference(state) {
        return state.preference || {};
      }
    }),

    currentNav() {
      return this.$route.path;
    },

    authorizedNav() {
      // const { authService } = this.$services;

      return NavUtil.getAuthorizedNav(NavConfig, {
        hasNavAuth(key) {
          return true;
          // return authService.hasNavAuth(key);
        },
        hasURIAuth(key) {
          return true;
          // return authService.hasURIAuth(key);
        },
        hasAliasAuth(key) {
          return true;
          // return authService.hasAliasAuth(key);
        }
      });
    }
  },

  data() {
    return {
      logoImg
    };
  }
};
</script>
