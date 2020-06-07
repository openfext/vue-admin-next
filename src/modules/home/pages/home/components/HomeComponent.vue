<template>
  <div class="home-content">
    <el-row :gutter="20">
      <el-col :md="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>
              基于多模块设计、Vue Composition API 的企业级应用 -
              <a href="https://github.com/openfext/vue-admin-next">
                源码地址
              </a>
              <span> / </span>
              <a
                href="https://openfext.github.io/docs/zh/vue-admin-next/guide/start.html"
              >
                参考文档
              </a>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="6" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="16" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
      <el-col :md="8" :sm="12" :xs="24">
        <el-card>
          <template v-slot:header>
            <div>
              <span>系统简介</span>
            </div>
          </template>
          <div>
            <p>欢迎使用 Vue Admin Next</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  name: 'home-component',

  data() {
    return {};
  }
};
</script>
