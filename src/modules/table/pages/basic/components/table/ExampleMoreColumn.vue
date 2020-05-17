<template>
  <el-form class="example-more-column-content" size="mini" :inline="true">
    <el-row :gutter="20">
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="ID">
          <clipboard-text>{{ row.id }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>{{ row.title }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="创建时间">
          <clipboard-text>{{ row.createTime }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="创建人">
          <clipboard-text>{{ row.createUserName }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="分类">
          <clipboard-text>{{ row.category }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="地区">
          <clipboard-text>{{ row.place }}</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述描述</clipboard-text>
        </el-form-item>
      </el-col>
      <el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="12">
        <el-form-item size="mini" label="标题">
          <clipboard-text>描述描述</clipboard-text>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.example-more-column-content {
  margin-top: 20px;

  .el-form-item--mini.el-form-item {
    margin-bottom: 10px;
  }
}
</style>

<script>
export default {
  name: 'example-more-column',

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
  }
};
</script>
