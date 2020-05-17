<template>
  <el-form size="mini" :inline="true">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item size="mini" label="时间一">
          <el-date-picker
            clearable
            v-model="state.filter.C1"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item size="mini" label="时间二">
          <el-date-picker
            clearable
            v-model="state.filter.C2"
            type="date"
            placeholder="选择日期，支持快速选择"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item size="mini" label="时间三">
          <el-date-picker
            clearable
            v-model="state.filter.C3"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerRangeOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script>
import {
  getPickerShortcuts,
  getPickerRangeShortcuts
} from '@/common/utils/picker';

export default {
  name: 'example-time-query',

  props: {
    table: {
      type: Object,
      required: true
    }
  },

  setup(props, context) {
    const { state } = props.table;

    return {
      state
    };
  },

  data() {
    return {};
  },

  computed: {
    pickerOptions() {
      return {
        shortcuts: getPickerShortcuts()
      };
    },

    pickerRangeOptions() {
      return {
        shortcuts: getPickerRangeShortcuts()
      };
    }
  }
};
</script>
