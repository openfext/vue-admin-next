<template>
  <el-card>
    <div>
      <h1>500</h1>
      <p>
        <span>对不起，服务器内部错误！请稍后再试或联系管理员。</span>
        <router-link to="/" replace>点此返回首页</router-link>
        <span>。</span>
      </p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'internal-server-error',

  beforeRouteLeave(to, from, next) {
    this.$closeView();
    next();
  }
};
</script>
