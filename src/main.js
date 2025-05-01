import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import ToastService from 'primevue/toastservice';
import '@/assets/main.css';
import 'primeicons/primeicons.css';

createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue, {
    theme: {
      preset: Material,
      options: {
        order: ['light', 'dark'],
        darkModeSelector: '.dark',
      },
    },
  })
  .use(ToastService)
  .mount('#app');
