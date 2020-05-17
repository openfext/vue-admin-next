<template>
  <el-form-item label="当前时间" size="medium" :required="isRequired">
    <div>{{ clock }}</div>
  </el-form-item>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-clock',

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
    const { isRequired } = useFormElement(props, context);

    return {
      isRequired
    };
  },

  data() {
    return {
      task: null,
      clock: this.getTime()
    };
  },

  created() {
    this.start();
  },

  beforeDestroy() {
    this.clear();
  },

  methods: {
    start() {
      this.task = setInterval(() => {
        this.clock = this.getTime();
        this.$forceUpdate();
      }, 1000);
    },

    clear() {
      clearInterval(this.task);
      this.task = null;
    },

    getTime() {
      return new Date().toLocaleString();
    }
  }
};
</script>
