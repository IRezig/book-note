<template>
  <div class="card">
    <Menubar :model="items" class="mb-4">
      <template #end>
        <div class="flex items-center gap-2">
          <InputSwitch v-model="isDark" aria-label="Toggle dark mode" @change="toggleTheme" />
          <i :class="['pi', isDark ? 'pi-moon' : 'pi-sun']" />
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

const { isDark, toggleTheme, initializeTheme } = useTheme();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/',
  },
  {
    label: 'Reflection',
    icon: 'pi pi-star',
    to: '/book',
  },
]);

onMounted(() => {
  initializeTheme();
});
</script>
