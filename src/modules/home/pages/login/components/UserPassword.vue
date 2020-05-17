<template>
  <validation-provider :rules="rules">
    <template v-slot="{ errors }">
      <el-form-item size="small">
        <el-input
          show-password
          type="password"
          name="password"
          placeholder="密码"
          suffix-icon="el-icon-d-arrow-righ"
          :value="localValue"
          @input="updateLocalValue"
        >
        </el-input>
        <app-form-error :error="errors[0]"></app-form-error>
      </el-form-item>
    </template>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'user-password',

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
