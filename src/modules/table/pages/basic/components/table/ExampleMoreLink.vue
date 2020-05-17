<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="常用操作">
      <ul class="list-inline vertical-space-15 horizontal-space-20">
        <li>
          <a @click="doSomeThing">操作一</a>
        </li>
        <li>
          <a @click="doSomeThing">操作二</a>
        </li>
        <li>
          <a @click="doSomeThing">操作三</a>
        </li>
        <li>
          <a @click="doSomeThing">操作四</a>
        </li>
        <li>
          <a @click="doSomeThing">操作五</a>
        </li>
        <li>
          <a @click="doSomeThing">操作六</a>
        </li>
        <li>
          <a @click="doSomeThing">操作七</a>
        </li>
        <li>
          <a @click="doSomeThing">操作八</a>
        </li>
        <li>
          <a @click="doSomeThing">操作九</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十一</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十二</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十三</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十四</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十五</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十六</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十七</a>
        </li>
        <li>
          <a @click="doSomeThing">操作十八</a>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="运营类操作">
      <ul class="list-inline vertical-space-15 horizontal-space-20">
        <li>
          <a @click="doSomeThing">操作一</a>
        </li>
        <li>
          <a @click="doSomeThing">操作二</a>
        </li>
        <li>
          <a @click="doSomeThing">操作三</a>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="日志类操作">
      <ul class="list-inline vertical-space-15 horizontal-space-20">
        <li>
          <a @click="doSomeThing">操作一</a>
        </li>
        <li>
          <a @click="doSomeThing">操作二</a>
        </li>
        <li>
          <a @click="doSomeThing">操作三</a>
        </li>
        <li>
          <a @click="doSomeThing">操作四</a>
        </li>
        <li>
          <a @click="doSomeThing">操作五</a>
        </li>
        <li>
          <a @click="doSomeThing">操作六</a>
        </li>
        <li>
          <a @click="doSomeThing">操作七</a>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'example-more-link',

  props: {
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    doSomeThing() {
      const message = `数据 ${this.row.id} 操作成功！`;

      this.$logger.log('[doSomeThing]', 'Success');

      this.$message({
        type: 'success',
        message
      });
    }
  }
};
</script>
