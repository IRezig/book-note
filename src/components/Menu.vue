<template>
  <div class="card">
    <Menubar :model="items" class="mb-4">
      <template #end>
        <div class="flex items-center gap-2">
          <InputSwitch v-model="isDark" aria-label="Toggle dark mode" />
          <img v-if="isDark" src="../../public/monkey-sun-glasses.png" alt="Toggle dark mode" class="w-8 h-8" />
          <img v-else src="../../public/monkey-reading-glasses.png" alt="Toggle dark mode" class="w-8 h-8" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Menubar from 'primevue/menubar';
import InputSwitch from 'primevue/inputswitch';
import { useTheme } from '@/composables/useTheme';

const { isDark, initializeTheme } = useTheme();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/',
  },
  {
    label: 'Books',
    icon: 'pi pi-book',
    to: '/books',
  },
]);

onMounted(() => {
  initializeTheme();
});
</script>
