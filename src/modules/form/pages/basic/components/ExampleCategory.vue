<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="分类" size="medium" :required="isRequired">
      <el-checkbox-group :value="localValue" @input="updateLocalValue">
        <el-checkbox :label="1">剧情</el-checkbox>
        <el-checkbox :label="2">喜剧</el-checkbox>
        <el-checkbox :label="4">战争</el-checkbox>
        <el-checkbox :label="5">西部</el-checkbox>
        <el-checkbox :label="6">科幻</el-checkbox>
        <el-checkbox :label="7">悬疑</el-checkbox>
        <el-checkbox :label="8">灾难</el-checkbox>
        <el-checkbox :label="9">武侠</el-checkbox>
        <el-checkbox :label="10">动画</el-checkbox>
        <el-checkbox :label="11">动作</el-checkbox>
        <el-checkbox :label="12">历史</el-checkbox>
      </el-checkbox-group>
      <app-form-error :error="errors[0]"></app-form-error>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-category',

  props: {
    name: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  },

  created() {
    this.setInitialValue([]);
  }
};
</script>
