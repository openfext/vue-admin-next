import AppLayout from '@/common/layout';

const ExampleBasicList = () =>
  import(
    /* webpackChunkName: "table" */ '../pages/basic/ExampleBasicList'
  ).then(ExampleBasicList => ExampleBasicList);

const tableRootModule = {
  text: '列表页',
  link: '/table'
};

const routes = [
  {
    path: '/table',
    component: AppLayout,
    children: [
      {
        path: 'basic/query',
        component: ExampleBasicList,
        meta: {
          breadcrumbs: [tableRootModule, '查询展示'],
          name: 'example-list',
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
