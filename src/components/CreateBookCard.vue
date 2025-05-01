<template>
  <div
    class="w-80 h-80 mt-4 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-white hover:bg-blue-50 focus:bg-blue-100 outline-none transition-colors duration-200 shadow-md"
    tabindex="0"
    aria-label="Create a new reflection"
    role="button"
    @click="handleCreateReflectionClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 text-blue-400 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    <span class="text-lg font-semibold text-blue-600">Create a new reflection</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCreateReflectionClick = () => {
  router.push('/book');
};
</script>
