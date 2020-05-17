<template>
  <div
    class="el-pagination-wrapper"
    :class="{ 'is-top-pagination': mode === 'top' }"
  >
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="setPageSize"
      @current-change="setPageNo"
      :current-page="state.page.pageNo"
      :page-sizes="pageSizes"
      :page-size="state.page.pageSize"
      :total="state.list.totalCount"
    >
    </el-pagination>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  name: 'example-query-page',

  props: {
    table: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'bottom'
    }
  },

  setup(props) {
    const { state, setPageSize, setPageNo } = props.table;

    return {
      state,
      setPageSize,
      setPageNo
    };
  },

  data() {
    return {
      pageSizes: [5, 10, 20, 40, 80]
    };
  }
};
</script>
