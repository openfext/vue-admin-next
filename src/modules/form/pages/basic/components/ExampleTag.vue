<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="标签" size="medium" :required="isRequired">
      <el-select
        :value="localValue"
        @input="updateLocalValue"
        clearable
        filterable
        allow-create
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        >
        </el-option>
      </el-select>
      <app-form-error :error="errors[0]"></app-form-error>
      <app-form-tip>支持手动输入标签，开启推荐时必填</app-form-tip>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-tag',

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
    return {
      options: [
        {
          id: 1,
          name: '生活'
        },
        {
          id: 2,
          name: '情怀'
        },
        {
          id: 3,
          name: '信仰'
        }
      ]
    };
  }
};
</script>
