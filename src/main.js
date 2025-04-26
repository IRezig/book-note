import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import '@/assets/main.css';

createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount('#app');
