<template>
  <el-tooltip
    manual
    v-model="tipVisible"
    content="复制成功！"
    placement="right"
  >
    <span @click="copyText" class="clipboard-text">
      <slot></slot>
    </span>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.clipboard-text {
  cursor: copy;
}
</style>

<script>
import copy from 'copy-text-to-clipboard';

export default {
  name: 'clipboard-text',

  props: {
    delay: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      timeoutId: null,

      text: '',

      tipVisible: false
    };
  },

  mounted() {
    this.text = this.$el.innerText;
  },

  updated() {
    this.text = this.$el.innerText;
  },

  methods: {
    timeout(callback, delay = 1000) {
      window.clearTimeout(this.timeoutId);

      this.timeoutId = window.setTimeout(() => {
        callback();
      }, delay);
    },

    copyText() {
      copy(this.text);

      this.tipVisible = true;
      this.timeout(() => {
        this.tipVisible = false;
      }, this.delay);
    }
  }
};
</script>
