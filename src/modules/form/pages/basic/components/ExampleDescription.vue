<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="简介" size="medium" :required="isRequired">
      <el-input
        clearable
        :value="localValue"
        @input="updateLocalValue"
        type="textarea"
        :rows="6"
        maxlength="240"
        show-word-limit
        placeholder="剧情描述"
      ></el-input>
      <app-form-error :error="errors[0]"></app-form-error>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-description',

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
