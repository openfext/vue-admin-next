<template>
  <el-form>
    <ul class="list-inline vertical-space-10 horizontal-space-10">
      <li>
        <el-dropdown @command="handleExportCommand" placement="bottom-start">
          <el-button size="small" type="primary" plain>
            导出数据<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">
              导出当前页
            </el-dropdown-item>
            <el-dropdown-item command="selected">
              导出已选择的数据
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <el-dropdown @command="handleBatchCommand">
          <el-button size="small" type="primary" plain>
            批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="publish">批量发布</el-dropdown-item>
            <el-dropdown-item command="offline">批量下线</el-dropdown-item>
            <el-dropdown-item command="relate">批量关联</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li>
        <table-selection-ultimate
          ref="ultimateSelection"
          btnText="跨页数据选择"
          :table="table"
          :columns="[
            { prop: 'id', label: 'ID' },
            { prop: 'title', label: '标题' }
          ]"
        ></table-selection-ultimate>
      </li>
    </ul>
    <example-batch-publish
      v-if="batchState.command === 'publish'"
      @complete="batchState.command = null"
      :list="batchState.list"
    ></example-batch-publish>
    <example-batch-offline
      v-if="batchState.command === 'offline'"
      @complete="batchState.command = null"
      :list="batchState.list"
    ></example-batch-offline>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script>
import { ExportUtil } from '@/common/utils';
import { TableSelectionUltimate } from '@/common/components/extend/table-selection-ultimate';
import ActionComponents from './actions';

export default {
  name: 'example-toolbar',

  components: {
    TableSelectionUltimate,

    ...ActionComponents
  },

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { state } = props.table;

    return {
      state
    };
  },

  data() {
    return {
      batchState: {
        list: [],

        command: null
      }
    };
  },

  methods: {
    async handleBatchCommand(command) {
      this.batchState.list = await this.$refs.ultimateSelection.use();

      if (!this.batchState.list.length) {
        this.$message({
          type: 'error',
          message: '未选择任何数据！'
        });
        return;
      }

      const setCommand = () => (this.batchState.command = command);
      const actions = {
        publish: setCommand,
        offline: setCommand,
        relate: () => {
          this.$logger.log('[BatchRelate]', '[data]', this.batchState.list);
          this.$message({
            type: 'success',
            message: '跳转至批量关联页（未实现）！'
          });
        },
        error: () => {
          this.$message({
            type: 'error',
            message: '无效的批量操作！'
          });
        }
      };

      const action = actions[command] || actions['error'];

      return action();
    },

    async handleExportCommand(command) {
      const downloadCSV = async (data = []) => {
        const fileName = 'ExampleCSV';
        if (data.length) {
          ExportUtil.downloadCSV(data, fileName);
        } else {
          this.$message({
            type: 'error',
            message: '当前导出数据为空！'
          });
        }
      };
      const actions = {
        all: async () => {
          const { result = [] } = this.state.list;

          downloadCSV(result);
        },
        selected: async () => {
          const data = await this.$refs.ultimateSelection.use();

          downloadCSV(data);
        },
        error: () => {
          this.$message({
            type: 'error',
            message: '无效的导出操作！'
          });
        }
      };

      const action = actions[command] || actions['error'];

      return action();
    }
  }
};
</script>
