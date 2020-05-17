<template>
  <el-form>
    <ul class="list-inline vertical-space-10 horizontal-space-10">
      <li>
        <el-tooltip effect="dark" content="快捷查询条件" placement="top-start">
          <span>常用查询：</span>
        </el-tooltip>
      </li>
      <li v-for="query in queries" :key="query.name">
        <a @click="updateQuery(query)">{{ query.name }}</a>
      </li>
    </ul>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'example-quick-query',

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { state, setFilter, triggerUpdate } = props.table;

    return {
      state,

      setFilter,
      triggerUpdate
    };
  },

  data() {
    return {
      // 可以保存至数据库、LocalStorage 等
      queries: [
        {
          name: 'ID - 2020',
          filter: {
            id: 2020
          }
        },
        {
          name: '标题 - Next',
          filter: {
            q: 'Next'
          }
        }
      ]
    };
  },

  methods: {
    updateQuery(query) {
      try {
        this.$logger.log('[updateQuery]', '[query]', query.filter);

        this.setFilter(query.filter || {}, {
          merge: false
        });
        this.triggerUpdate();
      } catch (err) {
        this.$message({
          type: 'error',
          message: '无效的查询条件！'
        });
      }
    }
  }
};
</script>
