<template>
  <transition name="fade">
    <div v-show="!!formValues.recommended">
      <validation-provider :rules="rules" v-slot="{ errors }">
        <el-form-item label="推荐评分" size="medium" :required="isRequired">
          <el-input-number
            :value="localValue"
            @input="updateLocalValue"
            :min="1"
            :max="5"
          ></el-input-number>
          <app-form-error :error="errors[0]"></app-form-error>
        </el-form-item>
      </validation-provider>
    </div>
  </transition>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-recommend-rate',

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
