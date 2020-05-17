<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="短标题" size="medium" :required="isRequired">
      <el-input
        clearable
        :value="localValue"
        @input="updateLocalValue"
        type="text"
        placeholder="短标题"
      ></el-input>
      <app-form-error :error="errors[0]"></app-form-error>
      <app-form-tip>
        表单联动 - 新建时自动复制“标题”的内容，除非手动进行修改
      </app-form-tip>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-short-name',

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

  watch: {
    'formValues.name'(value, oldValue) {
      const canDoSync = !(this.dirty || this.formValues.id);

      if (canDoSync) {
        // modify without dirty
        this.setInitialValue(value);
      }
    }
  },

  data() {
    return {};
  }
};
</script>
