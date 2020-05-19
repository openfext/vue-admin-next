import Dao from '@/base/dao';

class CommonDao extends Dao {
  async login(options = {}) {
    const { data = {} } = options;

    return this.delay(1000)
      .then(() => {
        if (data.username === 'admin' && data.password === '123456') {
          return {
            code: 'SUCCESS'
          };
        } else {
          return {
            code: 'ERROR'
          };
        }
      })
      .then(this.checkCode);
  }

  async logout(options = {}) {
    return this.delay(1000)
      .then(() => {
        return {
          code: 'SUCCESS'
        };
      })
      .then(this.checkCode);
  }

  async getAppUserInfo(options = {}) {
    return this.delay(2000)
      .then(() => {
        return {
          code: 'SUCCESS',
          data: {
            global: {
              user: {
                id: '20200202',
                name: 'Felix Yang'
              },
              auth: [
                // 首页
                '/',

                // 外部链接，可设置为完整链接也可以设置为别名
                // 'https://cn.vuejs.org/',
                'AUTH_alias_vue_site',

                // 导航权限
                'AUTH_nav_dashboard',

                // 操作权限，如按钮等
                // 'AUTH_action_example_publish',
                'AUTH_action_example_offline'
              ]
            }
          }
        };
      })
      .then(this.checkCode);
  }
}

export default CommonDao;
