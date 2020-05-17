<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="类型" size="medium" :required="isRequired">
      <el-radio-group :value="localValue" @input="updateLocalValue">
        <el-radio :label="1">好莱坞大片</el-radio>
        <el-radio :label="2">网络大电影</el-radio>
      </el-radio-group>
      <app-form-error :error="errors[0]"></app-form-error>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-type',

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
  }
};
</script>
