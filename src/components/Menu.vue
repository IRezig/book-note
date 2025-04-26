<template>
  <div class="card">
    <Menubar :model="items" class="mb-4" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: '/',
  },
  {
    label: 'Reflection',
    icon: 'pi pi-star',
    to: '/reflection',
  },
]);
</script>
