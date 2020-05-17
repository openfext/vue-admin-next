<template>
  <div>
    <el-table
      v-loading="loading"
      :data="state.list.result"
      :default-sort="customPageSorter"
      @sort-change="setPageSort"
      @selection-change="setSelection"
      style="width: 100%;"
      :border="true"
      stripe
    >
      <el-table-column type="expand">
        <template v-slot="{ row }">
          <div class="cell-block">
            <span> 分类：</span>
            <clipboard-text>{{ row.category }}</clipboard-text>
          </div>
          <div class="cell-block">
            <span> 地区：</span>
            <clipboard-text>{{ row.place }}</clipboard-text>
          </div>
          <div class="cell-block">
            <span> 更多：</span>
            <a @click="publish(row)">
              发布
            </a>
            <a @click="offline(row)">
              下线
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        sortable="custom"
        show-overflow-tooltip
        width="120"
      >
        <template v-slot="{ row }">
          <clipboard-text>{{ row.id }}</clipboard-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="pageId"
        label="PAGE ID"
        sortable="custom"
        show-overflow-tooltip
        width="120"
      >
        <template v-slot="{ row }">
          <clipboard-text>{{ row.pageId }}</clipboard-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题（点击复制）"
        show-overflow-tooltip
        min-width="240"
      >
        <template v-slot="{ row }">
          <clipboard-text>{{ row.title }}</clipboard-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable="custom"
        show-overflow-tooltip
        min-width="120"
      >
        <template v-slot="{ row }">
          <clipboard-text>{{ row.createTime }}</clipboard-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="创建人"
        show-overflow-tooltip
        min-width="120"
      >
        <template v-slot="{ row }">
          <clipboard-text>{{ row.createUserName }}</clipboard-text>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        show-overflow-tooltip
        min-width="180"
      >
        <template v-slot="{ row }">
          <span @mouseenter="currentRow = row">
            <el-popover
              placement="bottom"
              title="详细信息 - 支持点击文本复制到剪贴板"
              :width="windowInnerWidth * 0.7"
              trigger="hover"
              :open-delay="100"
              :close-delay="100"
            >
              <example-more-column
                v-if="currentRow && row.id === currentRow.id"
                :row="row"
              ></example-more-column>
              <a slot="reference">
                查看详情
              </a>
            </el-popover>
          </span>
          <span @mouseenter="currentRow = row">
            <el-popover
              placement="bottom"
              title="全部操作"
              :width="480"
              trigger="hover"
              :open-delay="100"
              :close-delay="100"
            >
              <example-more-link
                v-if="currentRow && row.id === currentRow.id"
                :row="row"
              ></example-more-link>
              <a slot="reference">
                全部操作
              </a>
            </el-popover>
          </span>
          <router-link :to="`/form/basic/${row.pageId}`">修改</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { useResize, useLoading } from '@fext/vue-use';
import TableComponents from './table';

export default {
  name: 'example-table',

  components: {
    ...TableComponents
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
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate
    } = props.table;
    const { loading, withLoading } = useLoading();
    const { windowInnerWidth } = useResize();

    return {
      // from loading composition
      loading,
      withLoading,

      // from resize composition
      windowInnerWidth,

      // from table composition
      state,
      customPageSorter,
      setPageSort,
      setList,
      setSelection,
      watchUpdate
    };
  },

  computed: {
    query() {
      const { page, filter } = this.state;
      return {
        page,
        filter
      };
    }
  },

  data() {
    return {
      currentRow: null
    };
  },

  created() {
    this.watchUpdate(() => {
      this.fetchList();
    });
  },

  methods: {
    async fetchList() {
      this.withLoading(() => {
        return this.$services.exampleListService
          .getList({
            data: this.query
          })
          .then(list => {
            this.setList(list);
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '查询列表数据失败！'
            });
          });
      });
    },

    publish(row) {
      this.$logger.log('[PublishRow]', '[data]', row);
      this.$message({
        type: 'success',
        message: `数据发布成功 (${row.id})`
      });
    },

    offline(row) {
      this.$logger.log('[OfflineRow]', '[data]', row);
      this.$message({
        type: 'info',
        message: `数据下线成功 (${row.id})`
      });
    }
  }
};
</script>
