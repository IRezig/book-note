<template>
  <div
    class="w-80 h-80 mt-4 flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-lg cursor-pointer bg-white hover:bg-orange-50 focus:bg-orange-100 outline-none transition-colors duration-200 shadow-md"
    tabindex="0"
    aria-label="Add a new Book"
    role="button"
    @click="handleCreateBook"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 text-orange-900 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    <span class="text-lg font-semibold text-orange-900">Add a new Book</span>
  </div>
  <Modal v-if="showModal" @cancel="handleCloseModal" />
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';

const showModal = ref(false);

const handleCreateBook = () => {
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
};
</script>
