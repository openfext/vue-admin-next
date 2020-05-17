<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="是否推荐" size="medium" :required="isRequired">
      <el-switch
        :active-value="1"
        :inactive-value="0"
        :value="localValue"
        @input="updateLocalValue"
      ></el-switch>
      <app-form-error :error="errors[0]"></app-form-error>
      <app-form-tip>表单联动 - 开启推荐后可设置推荐评分</app-form-tip>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-recommended',

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
