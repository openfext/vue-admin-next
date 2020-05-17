<template>
  <div class="app-table-selection-ultimate">
    <div class="app-table-selection-ultimate-dropdown">
      <el-dropdown @command="handleSelectionCommand">
        <el-badge :value="crossPageSelectionCount" :max="99" class="item">
          <el-button :size="btnSize" :type="btnType" :plain="btnPlain">
            {{ btnText }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="!selectionCount" command="append">
            <i class="el-icon-plus"></i>
            <span>
              添加当前选择项
              <span> ({{ selectionCount }}) </span>
            </span>
          </el-dropdown-item>
          <!--
          <el-dropdown-item :disabled="!selectionCount" command="delete">
            <i class="el-icon-minus"></i>
            <span>
              移除当前选择项
              <span> ({{ selectionCount }}) </span>
            </span>
          </el-dropdown-item>
          -->
          <el-dropdown-item
            :disabled="!crossPageSelectionCount"
            divided
            command="show"
          >
            <i class="el-icon-files"></i>
            <span>
              查看全部
              <span class="selection-count">
                ({{ crossPageSelectionCount }})
              </span>
            </span>
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="!crossPageSelectionCount"
            command="clear"
          >
            <i class="el-icon-delete"></i>
            <span>
              清空全部
              <span> ({{ crossPageSelectionCount }}) </span>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="查看跨页数据"
      :visible.sync="dialogCrossPageSelection"
      width="80%"
    >
      <table-with-pager :data="state.crossPageSelection" :columns="columns">
        <template v-slot:default>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            :disabled="!dialogSelection.length"
            @click="deleteCrossPageSelection(dialogSelection)"
          >
            删除
          </el-button>
        </template>
        <template v-slot:table="scope">
          <el-table
            :data="scope.data"
            @selection-change="selection => (dialogSelection = selection)"
            style="width: 100%"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column
              v-for="col in scope.columns"
              :key="col.prop"
              :prop="col.prop"
              :label="col.label"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              show-overflow-tooltip
              width="100"
            >
              <template v-slot="scope">
                <a @click="removeCrossPageSelection([scope.row])">
                  移除
                </a>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </table-with-pager>
      <span slot="footer">
        <el-button size="small" @click="dialogCrossPageSelection = false">
          关闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.selection-count {
  color: #f56c6c;
}

.app-table-selection-ultimate {
  .el-button + .el-button {
    margin-left: 2px;
  }
}
</style>

<script>
import { TableWithPager } from '@/common/components/extend/table-with-pager';

export default {
  name: 'app-table-selection-ultimate',

  components: {
    TableWithPager
  },

  props: {
    table: {
      type: Object,
      required: true
    },
    btnText: {
      type: String,
      default: '跨页数据选择'
    },
    btnSize: {
      type: String,
      default: 'small'
    },
    btnType: {
      type: String,
      default: 'primary'
    },
    btnPlain: {
      type: Boolean,
      default: true
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
    }
  },

  setup(props) {
    const {
      state,
      addCrossPageSelection,
      removeCrossPageSelection,
      clearCrossPageSelection
    } = props.table;

    return {
      state,
      addCrossPageSelection,
      removeCrossPageSelection,
      clearCrossPageSelection
    };
  },

  data() {
    return {
      dialogSelection: [],
      dialogCrossPageSelection: false
    };
  },

  computed: {
    selectionCount() {
      return this.state.selection.length;
    },

    crossPageSelectionCount() {
      return this.state.crossPageSelection.length;
    }
  },

  methods: {
    use() {
      const { selectionCount, crossPageSelectionCount, state } = this;
      const currentPageSelection = state.selection;
      const crossPageSelection = state.crossPageSelection;

      if (!crossPageSelectionCount) {
        return selectionCount ? currentPageSelection : [];
      }

      if (!selectionCount) {
        return crossPageSelectionCount ? crossPageSelection : [];
      }

      const message = `存在 ${crossPageSelectionCount} 条跨页数据，请确认是否使用？`;

      return this.$confirm(message, `数据确认`, {
        showClose: false,
        confirmButtonText: `使用跨页数据 (${crossPageSelectionCount})`,
        cancelButtonText: `使用当前选择的数据 (${selectionCount})`
      })
        .then(() => {
          return crossPageSelection;
        })
        .catch(() => {
          return currentPageSelection;
        });
    },

    handleSelectionCommand(command) {
      switch (command) {
        case 'append':
          this.appendCrossPageSelection();
          break;
        case 'delete':
          this.deleteCrossPageSelection();
          break;
        case 'show':
          this.showCrossPageSelection();
          break;
        case 'clear':
          this.confirmClearCrossPageSelection();
          break;
        default:
          break;
      }
    },

    showCrossPageSelection() {
      this.dialogCrossPageSelection = true;
    },

    appendCrossPageSelection(selection) {
      selection = selection || this.state.selection;

      if (selection.length) {
        const count = this.addCrossPageSelection(selection);
        this.$message({
          type: 'success',
          message: `当前选择项已添加至跨页数据！有效数据 ${count} 条。`
        });
      } else {
        this.$message({
          type: 'error',
          message: '未选择任何数据！'
        });
      }
    },

    deleteCrossPageSelection(selection) {
      selection = selection || this.state.selection;

      if (selection.length) {
        const count = this.removeCrossPageSelection(selection);
        this.$message({
          type: 'info',
          message: `已从跨页数据中移除当前选择项！有效数据 ${count} 条。`
        });
      } else {
        this.$message({
          type: 'error',
          message: '未选择任何数据！'
        });
      }
    },

    confirmClearCrossPageSelection() {
      const { crossPageSelectionCount } = this;
      const message = `此操作将清空 ${crossPageSelectionCount} 条跨页数据，是否继续？`;

      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const count = this.clearCrossPageSelection();
          this.$message({
            type: 'success',
            message: `清空跨页数据成功！共 ${count} 条。`
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          });
        });
    }
  }
};
</script>
