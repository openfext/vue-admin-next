<template>
  <el-dialog title="批量下线" :visible.sync="visible" width="80%">
    <table-with-pager :data="list" :columns="columns"></table-with-pager>
    <span slot="footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="offline">确定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
import { TableWithPager } from '@/common/components/extend/table-with-pager';

export default {
  name: 'example-batch-offline',

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
          prop: 'place',
          label: '地区'
        },
        {
          prop: 'title',
          label: '标题'
        }
      ]
    };
  },

  methods: {
    offline() {
      this.$logger.log('[BatchOffline]', '[data]', this.list);
      this.$message({
        type: 'success',
        message: '批量下线成功！'
      });

      this.visible = false;
    }
  }
};
</script>
