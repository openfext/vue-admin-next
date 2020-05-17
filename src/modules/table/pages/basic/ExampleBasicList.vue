<template>
  <div>
    <el-card class="margin-bottom-20">
      <example-quick-query :table="table"></example-quick-query>
      <el-divider class="transparent margin-top-bottom-10"></el-divider>
      <example-query-form :table="table"></example-query-form>
      <el-divider class="transparent margin-top-bottom-10"></el-divider>
      <example-toolbar :table="table"></example-toolbar>
    </el-card>

    <el-card>
      <transition name="fade">
        <example-query-page
          mode="top"
          :table="table"
          v-if="showTopPager"
        ></example-query-page>
      </transition>
      <example-table :table="table"></example-table>
      <example-query-page :table="table"></example-query-page>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { useTable } from '@fext/vue-use';
import TableComponents from './components';

export default {
  name: 'example-basic-list',

  components: {
    ...TableComponents
  },

  setup() {
    const table = useTable({
      uniqueKey: 'id',
      sortKeys: {
        order: 'order',
        orderBy: 'prop',
        asc: 'ascending',
        desc: 'descending'
      }
    });
    const { state, setInitialPage } = table;

    return {
      table,

      state,

      setInitialPage
    };
  },

  data() {
    return {};
  },

  computed: {
    showTopPager() {
      return this.state.page.pageSize >= 40;
    }
  },

  created() {
    this.setInitialPage({
      pageNo: 1,
      pageSize: 10,
      orderBy: 'id',
      order: 'asc'
    });
  },

  methods: {}
};
</script>
