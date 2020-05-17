<template>
  <el-form-item label="ID" size="medium" :required="isRequired">
    <div>{{ localValue }}</div>
  </el-form-item>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-id',

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
    const { isRequired, localValue } = useFormElement(props, context);

    return {
      isRequired,
      localValue
    };
  },

  data() {
    return {};
  }
};
</script>
