<template>
  <el-drawer
    class="app-layout-drawer"
    title="应用设置"
    append-to-body
    :visible.sync="visible"
    :direction="direction"
  >
    <div class="app-layout-drawer-body">
      <div class="app-layout-theme">
        <h4>主题设置</h4>
        <div class="switcher-list">
          <div class="switcher-item">
            <span>亮色模式</span>
            <el-switch
              class="switcher-item-input"
              v-model="themeLightMode"
            ></el-switch>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.app-layout-drawer {
  line-height: 1.5;

  ::v-deep [tabindex]:focus {
    outline: none;
  }

  .app-layout-drawer-body {
    padding: 0 20px 20px 20px;

    .switcher-list {
      line-height: 24px;

      .switcher-item {
        .switcher-item-input {
          float: right;
        }
      }
    }
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'app-drawer',

  components: {},

  props: {
    direction: {
      type: String,
      default: 'rtl'
    }
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

    themeLightMode: {
      get() {
        return this.preference.themeLightMode;
      },

      set(value) {
        this.updateUserPreference({
          themeLightMode: value
        });
      }
    },

    visible: {
      get() {
        return this.ui.isDrawerVisible;
      },

      set(value) {
        this.updateUIStatus({
          isDrawerVisible: value
        });
      }
    }
  },

  methods: {
    ...mapActions(['updateUIStatus', 'updateUserPreference'])
  }
};
</script>
