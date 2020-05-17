<template>
  <div class="app-table-with-pager">
    <slot></slot>
    <slot name="table" v-bind="{ data: currentPageList, columns }">
      <el-table :data="currentPageList" style="width: 100%">
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        ></el-table-column>
      </el-table>
    </slot>
    <slot
      name="pager"
      v-bind="{
        updatePageSize,
        updatePageNo,
        pageSize,
        pageSizes,
        pageLayout,
        totalCount
      }"
    >
      <el-pagination
        background
        @size-change="updatePageSize"
        @current-change="updatePageNo"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="pageLayout"
        :total="totalCount"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.app-table-with-pager {
  ::v-deep .el-pagination {
    padding-top: 20px;
  }
}
</style>

<script>
export default {
  name: 'app-table-with-pager',

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },

    columns: {
      type: Array,
      default() {
        return [
          {
            prop: 'id',
            label: 'ID'
          }
        ];
      }
    },

    defaultPageSize: {
      type: Number,
      default: 10
    },

    pageLayout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper, ->, total'
    },

    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 20, 40, 80];
      }
    }
  },

  data() {
    return {
      pageNo: 1,
      pageSize: 10
    };
  },

  watch: {
    totalCount(value) {
      const totalPage = Math.ceil(value / this.pageSize);

      if (this.pageNo > totalPage) {
        this.pageNo = Math.max(1, totalPage);
      }
    }
  },

  computed: {
    totalCount() {
      return this.data.length;
    },

    currentPageList() {
      const { data, pageNo, pageSize } = this;

      const start = pageSize * (pageNo - 1);
      return data.slice(start, start + pageSize);
    }
  },

  created() {
    this.pageSize = this.defaultPageSize;
  },

  methods: {
    updatePageSize(pageSize) {
      this.pageSize = pageSize;
    },

    updatePageNo(pageNo) {
      this.pageNo = pageNo;
    }
  }
};
</script>
