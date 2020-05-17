<template>
  <div class="app-form-action">
    <el-col :span="col" :offset="offset">
      <slot>
        <el-button class="app-form-action-btn">
          保存
        </el-button>
      </slot>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'app-form-action',

  props: {
    offset: {
      type: Number,
      default: 6
    }
  },

  computed: {
    col() {
      return 24 - this.offset;
    }
  },

  data() {
    return {};
  }
};
</script>
