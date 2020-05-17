<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="时间" size="medium" :required="isRequired">
      <el-date-picker
        :value="localValue"
        @input="updateLocalValue"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="发布时间"
      ></el-date-picker>
      <app-form-error :error="errors[0]"></app-form-error>
      <app-form-tip>
        日期精确到秒，通过自定义规则限制必须大于当前时间 30 秒
      </app-form-tip>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-time',

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
