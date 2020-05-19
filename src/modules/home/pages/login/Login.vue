<template>
  <div class="login-box">
    <div class="login-box__logo">
      <span>{{ ui.appName }}</span>
    </div>

    <validation-observer ref="observer" v-slot="{ invalid }">
      <el-form @keyup.native.enter="login" v-loading="loading">
        <el-card class="login-box__body">
          <p class="login-box__title">登录</p>
          <user-name rules="required" v-model="username"></user-name>
          <user-password rules="required" v-model="password"></user-password>
          <el-form-item size="small">
            <el-button
              type="primary"
              class="login-box__btn"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-card>
      </el-form>
    </validation-observer>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 360px;
  margin: 7% auto;

  .login-box__logo {
    font-size: 36px;
    text-align: center;
    margin-bottom: 25px;
    font-weight: 300;
  }

  .login-box__body {
    .login-box__title {
      margin: 0;
      text-align: center;
      padding: 0 20px 20px 20px;
    }

    .login-box__btn {
      width: 100%;
    }
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import { useLoading } from '@fext/vue-use';
import LoginComponents from './components';

export default {
  name: 'login-page',

  components: {
    ...LoginComponents
  },

  setup() {
    const { loading, withLoading } = useLoading();

    return {
      loading,
      withLoading
    };
  },

  data() {
    return {
      username: '',
      password: ''
    };
  },

  computed: {
    ...mapState({
      ui(state) {
        return state.ui || {};
      }
    }),

    userLoginData() {
      const { username, password } = this;

      return {
        username,
        password
      };
    }
  },

  methods: {
    ...mapActions(['setGlobalAppData']),

    login() {
      this.$refs.observer.validate().then(valid => {
        if (valid) {
          this.withLoading(
            () => {
              return this.$dao.commonDao
                .login({
                  data: this.userLoginData
                })
                .then(() => {
                  this.$notify({
                    type: 'success',
                    position: 'bottom-right',
                    title: '提示',
                    message: '登录成功！'
                  });
                  this.setGlobalAppData().then(() => {
                    this.$router.push('/');
                  });
                })
                .catch(ex => {
                  this.loading = false;
                  this.$message({
                    type: 'error',
                    message: '登录失败，请重试或联系管理员'
                  });
                });
            },
            {
              autocomplete: false
            }
          );
        }
      });
    }
  }
};
</script>
