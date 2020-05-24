import AppLayout from '@/common/layout';

const ExampleBasicForm = () =>
  import(/* webpackChunkName: "form" */ '../pages/basic/ExampleBasicForm').then(
    ExampleBasicForm => ExampleBasicForm
  );
const ExampleFormBuilder = () =>
  import(
    /* webpackChunkName: "form" */ '../pages/form-builder/ExampleFormBuilder'
  ).then(ExampleFormBuilder => ExampleFormBuilder);

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
      },
      {
        path: 'form-builder',
        component: ExampleFormBuilder,
        meta: {
          breadcrumbs: [formRootModule, '表单生成器'],
          name: 'example-form-builder',
          requiresAuth: true
        }
      }
    ]
  }
];

export default routes;
