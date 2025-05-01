import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import DynamicDialog from 'primevue/dynamicdialog';
import '@/assets/main.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(DialogService);
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      order: ['light', 'dark'],
      darkModeSelector: '.dark',
    },
  },
});
app.use(ToastService);
app.component('DynamicDialog', DynamicDialog);
app.mount('#app');
