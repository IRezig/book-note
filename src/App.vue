<script setup>
import { RouterView } from 'vue-router';
import Menu from '@/components/Menu.vue';
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-200']">
    <Menu />
    <RouterView />
    <DynamicDialog />
    <Toast />
  </div>
</template>
