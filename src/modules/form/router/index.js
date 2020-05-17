import AppLayout from '@/common/layout';

const ExampleBasicForm = () =>
  import(/* webpackChunkName: "form" */ '../pages/basic/ExampleBasicForm').then(
    ExampleBasicForm => ExampleBasicForm
  );

const formRootModule = {
  text: '表单页',
  link: '/form'
};

const routes = [
  {
    path: '/form',
    component: AppLayout,
    children: [
      {
        path: 'basic/new',
        component: ExampleBasicForm,
        meta: {
          breadcrumbs: [formRootModule, '新建表单'],
          name: 'example-basic-form',
          requiresAuth: true
        }
      },
      {
        path: 'basic/:id',
        component: ExampleBasicForm,
        meta: {
          breadcrumbs: [formRootModule, '回填表单'],
          name: 'example-basic-form',
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
