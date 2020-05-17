<template>
  <el-submenu
    :data-level="level"
    :class="subMenuClasses"
    :index="block.key"
    :popper-append-to-body="false"
  >
    <template v-slot:title>
      <i
        :class="{ [block.icon || 'el-icon-location-outline']: true }"
        v-if="level === 1"
      ></i>
      <span>{{ block.name }}</span>
    </template>
    <template v-if="block.links">
      <el-menu-item
        v-for="linkItem in block.links"
        :key="linkItem.path"
        :index="linkItem.path"
      >
        <router-link
          v-if="!linkItem.route && !linkItem.target"
          :to="linkItem.path"
        >
          {{ linkItem.name }}
        </router-link>
        <a v-else :href="linkItem.path" :target="linkItem.target">
          {{ linkItem.name }}
        </a>
      </el-menu-item>
    </template>

    <template v-if="block.children && level < maxLevel">
      <sub-menu
        v-for="next in block.children"
        :key="next.key"
        :block="next"
        :level="level + 1"
        :maxLevel="maxLevel"
      >
      </sub-menu>
    </template>
  </el-submenu>
</template>

<style lang="scss" scoped>
.el-submenu ::v-deep {
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }

  .el-menu--vertical,
  .el-menu {
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      a {
        color: inherit;
        display: block;
      }
    }
  }

  .el-menu--vertical {
    .el-menu {
      padding: 0;
    }
  }
}

.el-submenu.el-menu-main-module ::v-deep {
  & > .el-submenu__title {
    transition: padding-left 0.3s, border-color 0.3s, background-color 0.3s,
      color 0.3s;
    padding-left: 10px !important;

    [class^='el-icon-'] {
      margin-right: 6px;
    }
  }
}

.el-submenu.el-menu-minor-module ::v-deep {
  & > .el-menu--vertical {
    top: -1px !important;
  }
}
</style>

<script>
export default {
  name: 'sub-menu',

  props: {
    block: {
      type: Object,
      default() {
        return {};
      }
    },

    level: {
      type: Number,
      default: 1
    },

    maxLevel: {
      type: Number,
      default: 2
    }
  },

  computed: {
    subMenuClasses() {
      if (this.level === 1) {
        return {
          'el-menu-main-module': true
        };
      }

      if (this.level === 2) {
        return {
          'el-menu-minor-module': true
        };
      }

      return {};
    }
  }
};
</script>
