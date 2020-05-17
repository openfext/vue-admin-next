<template>
  <div class="app-layout-footer">
    <div class="app-layout-footer-copyright">
      <span>MIT Licensed | Copyright © 2019-{{ appYear }} Felix Yang.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout-footer {
  padding-top: 8px;
  text-align: center;
}
</style>

<script>
export default {
  name: 'app-footer',
  data() {
    return {
      appYear: new Date().getFullYear()
    };
  }
};
</script>
