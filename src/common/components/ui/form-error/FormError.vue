<template>
  <transition name="form-error-transition">
    <div v-if="error" class="app-form-error-wrapper">
      <span class="app-form-error">
        <slot>{{ error }}</slot>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'app-form-error',

  props: {
    error: String
  },

  computed: {},

  data() {
    return {};
  }
};
</script>
