<template>
  <div class="flex flex-col items-center gap-2">
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      aria-label="Upload cover image"
      tabindex="-1"
      @change="handleFileChange"
    />
    <button
      type="button"
      class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Upload cover image"
      tabindex="0"
      @click="handleButtonClick"
      @keydown.enter.prevent="handleButtonClick"
      @keydown.space.prevent="handleButtonClick"
    >
      Upload Image
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['file-selected']);
const fileInput = ref(null);

const handleButtonClick = () => {
  fileInput.value?.click();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    emit('file-selected', file);
  }
};
</script>
