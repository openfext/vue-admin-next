const nav = [
  {
    key: 'dashboard',
    name: '控制台',
    icon: 'el-icon-odometer',
    links: [
      {
        name: '首页',
        path: '/'
      }
    ]
  },
  {
    key: 'table',
    name: '列表页',
    icon: 'el-icon-s-grid',
    children: [
      {
        key: 'table-basic',
        name: '基础列表',
        links: [
          {
            name: '查询展示',
            path: '/table/basic/query'
          }
        ]
      }
    ]
  },
  {
    key: 'form',
    name: '表单页',
    icon: 'el-icon-edit-outline',
    children: [
      {
        key: 'form-basic',
        name: '基础表单',
        links: [
          {
            name: '新建页',
            path: '/form/basic/new'
          },
          {
            name: '回填页',
            path: '/form/basic/100271'
          }
        ]
      },
      {
        key: 'form-builder',
        name: '动态表单',
        links: [
          {
            name: '表单生成器',
            path: '/form/form-builder'
          }
        ]
      }
    ]
  },
  {
    key: 'authority',
    name: '权限页',
    icon: 'el-icon-lock',
    links: [
      {
        name: '权限示例',
        path: '/authority/home'
      }
    ]
  },
  {
    key: 'error',
    name: '错误页面',
    icon: 'el-icon-heavy-rain',
    links: [
      {
        name: '403',
        path: '/error/403'
      },
      {
        name: '404',
        path: '/error/404'
      },
      {
        name: '500',
        path: '/error/500'
      }
    ]
  },
  {
    key: 'system',
    name: '系统管理',
    icon: 'el-icon-set-up',
    children: [
      {
        key: 'system_links',
        name: '外部链接',
        links: [
          {
            name: 'Vue',
            target: '_blank',
            alias: 'vue_site',
            path: 'https://cn.vuejs.org/'
          }
        ]
      }
    ]
  }
];

export default nav;
