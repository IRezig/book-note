<template>
  <div class="pinia">
    <div class="counter">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Daily Coding Reflection</h1>
      <DatePicker
        v-model="date"
        input-class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :aria-label="'Select date'"
        :tabindex="0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DatePicker from 'primevue/datepicker';

const date = ref('23/04/2025');
</script>

<style lang="less"></style>
