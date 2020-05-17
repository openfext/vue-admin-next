<template>
  <el-form size="medium" @keyup.native.enter="search">
    <el-row :gutter="20" class="vertical-space-10">
      <el-col :xl="4" :lg="4" :md="4" :sm="8">
        <example-query-id v-model="state.filter.id"></example-query-id>
      </el-col>
      <el-col :xl="14" :lg="12" :md="10" :sm="16">
        <example-query-name v-model="state.filter.q"></example-query-name>
      </el-col>
      <el-col :xl="6" :lg="8" :md="10" :sm="24">
        <el-button size="medium" type="primary" @click="search">
          搜索
        </el-button>
        <el-button size="medium" @click="reset" title="RESET">
          重置
        </el-button>
        <el-button
          size="medium"
          v-popover:moreQueryPopover
          icon="el-icon-arrow-down"
        >
        </el-button>
      </el-col>
    </el-row>
    <el-popover
      ref="moreQueryPopover"
      placement="bottom"
      title="更多查询条件"
      :width="windowInnerWidth * 0.6"
      trigger="click"
    >
      <el-tabs tab-position="right" class="more-query-tab">
        <el-tab-pane label="常用">
          <example-frequent-query :table="table"></example-frequent-query>
        </el-tab-pane>
        <el-tab-pane label="时间类">
          <example-time-query :table="table"></example-time-query>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </el-form>
</template>

<style lang="scss" scoped>
.more-query-tab {
  ::v-deep .el-tabs__content {
    margin-top: 20px;
  }
}
</style>

<script>
import { useResize } from '@fext/vue-use';
import BasicFormComponents from './form/basic';
import AdvancedFormComponents from './form/advanced';

export default {
  name: 'example-query-form',

  components: {
    ...BasicFormComponents,
    ...AdvancedFormComponents
  },

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const {
      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate
    } = props.table;

    const { windowInnerWidth } = useResize();

    return {
      windowInnerWidth,

      state,
      setPage,
      setFilter,
      resetFilter,
      setInitialFilter,
      triggerUpdate
    };
  },

  data() {
    return {};
  },

  created() {
    this.setInitialFilter(this.getInitialValues());
  },

  methods: {
    getInitialValues() {
      return {
        id: '',
        q: ''
      };
    },

    reset() {
      this.resetFilter();
      this.search();
    },

    search() {
      this.setPage({
        pageNo: 1
      });
      this.triggerUpdate();
    }
  }
};
</script>
