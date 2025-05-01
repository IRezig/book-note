<template>
  <span class="">Update your information.</span>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-3xl"
    tabindex="0"
    aria-modal="true"
    role="dialog"
    aria-label="Add a new Book Modal"
    @keydown.esc="handleCancel"
  >
    <div :class="`bg-white rounded-lg shadow-lg w-3/4 p-6 relative`" @click.stop>
      <h2 class="text-2xl font-bold mb-4 text-blue-700">Add a New Book</h2>
      <form class="flex flex-col gap-4" @submit.prevent="handleAddBook">
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Title</span>
          <input
            v-model="title"
            type="text"
            class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            aria-label="Book Title"
            placeholder="Enter book title"
            autofocus
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Author</span>
          <input
            v-model="author"
            type="text"
            class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            aria-label="Book Author"
            placeholder="Enter author name"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Image</span>
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            aria-label="Book Cover Image"
            required
            @change="handleImageChange"
          />
        </label>
        <div v-if="imagePreview" class="flex justify-center mt-2">
          <img :src="imagePreview" alt="Book cover preview" class="h-24 w-24 object-cover rounded border" />
        </div>
        <div v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</div>
        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            class="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Cancel"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Add Book"
          >
            Add Book
          </button>
        </div>
      </form>
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 focus:outline-none"
        aria-label="Close modal"
        tabindex="0"
        @click="handleCancel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
  width: {
    type: String,
    default: 'max-w-md',
  },
});

const dialog = useDialog();
const title = ref('');
const author = ref('');
const imageFile = ref(null);
const imagePreview = ref('');
const error = ref('');
const imageInput = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    imageFile.value = null;
    imagePreview.value = '';
    return;
  }
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select a valid image file.';
    imageFile.value = null;
    imagePreview.value = '';
    imageInput.value.value = '';
    return;
  }
  error.value = '';
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleAddBook = () => {
  if (!title.value.trim() || !author.value.trim() || !imageFile.value) {
    error.value = 'All fields are required.';
    return;
  }
  error.value = '';
  // Emit or handle the new book data here
  // For now, just close the modal
  dialog.close();
};

const handleCancel = () => {
  emit('cancel');
};

const emit = defineEmits(['cancel', 'save']);

const cancel = () => {
  emit('cancel');
};

const save = () => {
  emit('save');
};
</script>
