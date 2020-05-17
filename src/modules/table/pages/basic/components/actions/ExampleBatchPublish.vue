<template>
  <el-dialog title="批量发布" :visible.sync="visible" width="80%">
    <table-with-pager :data="list" :columns="columns"></table-with-pager>
    <span slot="footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="publish">确定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
import { TableWithPager } from '@/common/components/extend/table-with-pager';

export default {
  name: 'example-batch-publish',

  components: {
    TableWithPager
  },

  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  watch: {
    visible(value) {
      if (!value) {
        this.$emit('complete');
      }
    }
  },

  data() {
    return {
      visible: true,

      columns: [
        {
          prop: 'id',
          label: 'ID'
        },
        {
          prop: 'title',
          label: '标题'
        }
      ]
    };
  },

  methods: {
    publish() {
      this.$logger.log('[BatchPublish]', '[data]', this.list);
      this.$message({
        type: 'success',
        message: '批量发布成功！'
      });

      this.visible = false;
    }
  }
};
</script>
