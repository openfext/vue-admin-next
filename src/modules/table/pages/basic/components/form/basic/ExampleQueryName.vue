<template>
  <el-input
    clearable
    size="medium"
    type="text"
    :value="localValue"
    @input="updateLocalValue"
    placeholder="标题"
  />
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-query-name',

  props: {
    name: String,
    value: {
      required: false
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const { localValue, updateLocalValue } = useFormElement(props, context);

    return {
      localValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  }
};
</script>
