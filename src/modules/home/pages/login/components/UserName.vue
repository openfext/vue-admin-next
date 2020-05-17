<template>
  <validation-provider :rules="rules">
    <template v-slot="{ errors }">
      <el-form-item size="small">
        <el-input
          placeholder="用户"
          name="username"
          :value="localValue"
          @input="updateLocalValue"
        >
          <template v-slot:append>@felixpy.com</template>
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
  name: 'user-name',

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
