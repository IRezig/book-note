<script setup>
import { RouterView } from 'vue-router';
import Menu from '@/components/Menu.vue';
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-200']">
    <Menu />
    <RouterView />
  </div>
</template>
