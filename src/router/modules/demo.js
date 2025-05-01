export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/views/BookView.vue'),
  },
  {
    path: '/book/:id',
    name: 'book-id',
    component: () => import('@/views/BookView.vue'),
  },
];
