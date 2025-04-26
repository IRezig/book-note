export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/PiniaView.vue'),
  },
  {
    path: '/add-reflection',
    name: 'add-reflection',
    component: () => import('@/views/AddReflection.vue'),
  },
];
