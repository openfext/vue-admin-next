import AppLayout from '@/common/layout';

const AuthorityURI = () =>
  import(/* webpackChunkName: "authority" */ '../pages/uri/AuthorityURI').then(
    AuthorityURI => AuthorityURI
  );
const AuthorityHome = () =>
  import(
    /* webpackChunkName: "authority" */ '../pages/home/AuthorityHome'
  ).then(AuthorityHome => AuthorityHome);

const authorityRootModule = {
  text: '权限页',
  link: '/authority'
};

const routes = [
  {
    path: '/authority',
    component: AppLayout,
    children: [
      {
        path: 'home',
        component: AuthorityHome,
        meta: {
          breadcrumbs: [authorityRootModule, '权限演示'],
          name: 'authority-home',
          requiresAuth: true
        }
      },
      {
        path: 'uri',
        component: AuthorityURI,
        meta: {
          breadcrumbs: [authorityRootModule, '页面权限'],
          name: 'authority-uri',
          requiresAuth: true,
          requiresURIAuth: true
        }
      }
    ]
  }
];

export default routes;
