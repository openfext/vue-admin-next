<template>
  <el-card>
    <div>
      <h1>404</h1>
      <p>
        <span>对不起，你要访问的页面不存在！</span>
        <router-link to="/" replace>点此返回首页</router-link>
        <span>。</span>
      </p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'not-found',

  beforeRouteLeave(to, from, next) {
    this.$closeView();
    next();
  }
};
</script>
