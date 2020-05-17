import AppLayout from '@/common/layout';
import {
  NotFound,
  Forbidden,
  InternalServerError
} from '@/common/components/error';

const HomePage = () =>
  import(/* webpackChunkName: "home" */ '../pages/home/Home').then(
    HomePage => HomePage
  );
const LoginPage = () =>
  import(/* webpackChunkName: "home" */ '../pages/login/Login').then(
    LoginPage => LoginPage
  );
const RefreshPage = () =>
  import(/* webpackChunkName: "home" */ '../pages/refresh/Refresh').then(
    RefreshPage => RefreshPage
  );

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        component: HomePage,
        meta: {
          name: 'home-page',
          title: '首页',
          requiresAuth: true,
          requiresURIAuth: true
        }
      },
      {
        path: '/refresh/:path',
        component: RefreshPage,
        meta: {
          tab: false,
          title: '刷新页面',
          requiresAuth: true
        }
      },
      {
        path: '/error/500',
        alias: '/error',
        component: InternalServerError,
        meta: {
          name: 'internal-server-error',
          title: '500',
          requiresAuth: true
        }
      },
      {
        path: '/error/403',
        alias: '/forbidden',
        component: Forbidden,
        meta: {
          name: 'forbidden',
          title: '403',
          requiresAuth: true
        }
      },
      {
        path: '/error/404',
        alias: '/notfound',
        component: NotFound,
        meta: {
          name: 'not-found',
          title: '404',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login-page'
  },
  {
    path: '*',
    redirect: '/error/404'
  }
];

export default routes;
