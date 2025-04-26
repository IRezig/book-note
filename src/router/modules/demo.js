export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/reflection',
    name: 'reflection',
    component: () => import('@/views/Reflection.vue'),
  },
  {
    path: '/reflection/:id',
    name: 'reflection-id',
    component: () => import('@/views/Reflection.vue'),
  },
];
