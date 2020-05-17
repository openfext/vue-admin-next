<template>
  <el-card>
    <div>
      <h1>403</h1>
      <p>
        <span>对不起，你没有访问权限！请联系管理员。</span>
        <router-link to="/" replace>点此返回首页</router-link>
        <span>。</span>
      </p>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'forbidden',

  beforeRouteLeave(to, from, next) {
    this.$closeView();
    next();
  }
};
</script>
