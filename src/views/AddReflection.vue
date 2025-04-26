<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Daily Coding Reflection</h1>
      <DatePicker
        v-model="date"
        showIcon
        fluid
        iconDisplay="input"
        input-class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        :aria-label="'Select date'"
        :tabindex="0"
      />

      <Button class="w-full text-white mt-4" label="Save" icon="pi pi-save" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
const date = ref('23/04/2025');
</script>

<style lang="less"></style>
