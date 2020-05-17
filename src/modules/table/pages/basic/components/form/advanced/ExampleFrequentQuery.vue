<template>
  <el-form size="mini" :inline="true">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item size="mini" label="常用一">
          <el-input clearable v-model="state.filter.A1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item size="mini" label="常用一">
          <el-input clearable v-model="state.filter.A2"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item size="mini" label="常用三">
          <el-input clearable v-model="state.filter.A3"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'example-frequent-query',

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
  }
};
</script>
