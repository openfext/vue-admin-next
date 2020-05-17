<template>
  <div>
    <el-card>
      <template v-slot:header>
        <div>
          <span>
            用户<b>页面</b>权限示例 - 可通过修改
            <code>CommonDao.getAppUserInfo</code> 返回的数据变更权限
          </span>
        </div>
      </template>
      <div>
        <div>场景一：无权限的页面</div>
        <ul class="list-inline vertical-space-10 horizontal-space-10">
          <li>
            <router-link to="/authority/uri">
              点击此处访问无权限的页面 - /authority/uri
            </router-link>
          </li>
        </ul>
      </div>
    </el-card>
    <el-divider class="transparent margin-top-bottom-10"></el-divider>
    <el-card>
      <template v-slot:header>
        <div>
          <span>
            用户<b>操作</b>权限示例 - 可通过修改
            <code>CommonDao.getAppUserInfo</code> 返回的数据变更权限
          </span>
        </div>
      </template>
      <div>
        <div>场景一：无权限禁用按钮</div>
        <ul class="list-inline vertical-space-10 horizontal-space-10">
          <li>
            <auth-provider v-slot="{ provider }">
              <el-button
                type="primary"
                size="medium"
                plain
                :disabled="!provider.hasActionAuth('example_publish')"
              >
                发布 - AUTH_action_example_publish
              </el-button>
            </auth-provider>
          </li>
          <li>
            <auth-provider v-slot="{ provider }">
              <el-button
                type="primary"
                size="medium"
                plain
                :disabled="!provider.hasActionAuth('example_offline')"
              >
                下线 - AUTH_action_example_offline
              </el-button>
            </auth-provider>
          </li>
        </ul>

        <el-divider class="transparent margin-top-bottom-10"></el-divider>

        <div>场景二：无权限隐藏按钮</div>
        <ul class="list-inline vertical-space-10 horizontal-space-10">
          <auth-provider v-slot="{ provider }">
            <li v-if="provider.hasActionAuth('example_publish')">
              <el-button type="primary" size="medium" plain>
                发布 - AUTH_action_example_publish
              </el-button>
            </li>
          </auth-provider>
          <auth-provider v-slot="{ provider }">
            <li v-if="provider.hasActionAuth('example_offline')">
              <el-button type="primary" size="medium" plain>
                下线 - AUTH_action_example_offline
              </el-button>
            </li>
          </auth-provider>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  name: 'authority-home',

  components: {}
};
</script>
