<template>
  <transition name="fade">
    <section v-if="!!breadcrumbs.length" class="app-layout-content-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb-item">
          <el-breadcrumb-item
            v-for="(item, key) in breadcrumbs"
            :key="item.text"
            :class="{ active: key + 1 === breadcrumbs.length }"
          >
            <router-link v-if="item.link" :to="item.link">
              {{ item.text }}
            </router-link>
            <span v-else>{{ item.text }}</span>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
.app-layout-content-breadcrumb {
  height: 100%;
  padding: 0 0 20px 0;

  .breadcrumb-item-move,
  .breadcrumb-item-enter-active,
  .breadcrumb-item-leave-active {
    transition: all 0.5s;
  }

  .breadcrumb-item-enter,
  .breadcrumb-item-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-item-leave-active {
    position: absolute;
  }
}
</style>

<script>
export default {
  name: 'app-breadcrumb',

  computed: {
    breadcrumbs() {
      let breadcrumbs = this.$route.meta.breadcrumbs;

      if (breadcrumbs) {
        breadcrumbs = breadcrumbs.map(breadcrumb => {
          if (typeof breadcrumb === 'string') {
            return {
              text: breadcrumb
            };
          }
          return breadcrumb;
        });
      }

      return breadcrumbs || this.getInitialBreadcrumbs();
    },

    dev() {
      let global = this.$store.state.global || {};
      return global.env !== 'production';
    },

    serverIP() {
      let global = this.$store.state.global || {};
      return global.serverIP || 'LOCAL';
    }
  },

  methods: {
    getInitialBreadcrumbs() {
      return [];
    }
  }
};
</script>
