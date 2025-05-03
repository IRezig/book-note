<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-orange-100/60"
    tabindex="0"
    aria-modal="true"
    role="dialog"
    aria-label="Add a new Book Modal"
    @click.self="handleCancel"
  >
    <div class="bg-white rounded-lg shadow-lg w-3/4 p-6 relative" @click.stop>
      <h2 class="text-2xl font-bold mb-4 text-blue-700">{{ isEdit ? 'Edit Book' : 'Add a New Book' }}</h2>
      <form class="flex flex-col gap-4" @submit.prevent="handleSaveBook">
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Title</span>
          <input
            v-model="title"
            type="text"
            class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            aria-label="Book Title"
            placeholder="Enter Book Title"
            autofocus
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Author</span>
          <input
            v-model="author"
            type="text"
            class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            aria-label="Book Author"
            placeholder="Enter author name"
          />
        </label>
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
            class="px-4 py-2 rounded bg-orange-400 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Add Book"
          >
            {{ isEdit ? 'Edit Book' : 'Add Book' }}
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
import { ref, onMounted } from 'vue';
import { useBookStore } from '@/store/modules/book';
import { useToast } from '@/composables/useToast';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = ref('');
const author = ref('');
const description = ref('');
const isbn = ref('');
const coverImage = ref('');
const genre = ref([]);
const publisher = ref('Publisher Name');
const publicationDate = ref('2021-01-01');
const pages = ref(300);
const error = ref('');
const bookStore = useBookStore();
const { showSuccess } = useToast();

const { id } = route.params;
const isEdit = ref(false);

const props = defineProps(['book']);
const emit = defineEmits(['cancel']);

onMounted(() => {
  if (id) {
    isEdit.value = true;
    if (props.book) {
      title.value = props.book.title;
      author.value = props.book.author;
      description.value = props.book.description;
      isbn.value = props.book.isbn;
      coverImage.value = props.book.coverImage;
      genre.value = props.book.genre;
      publisher.value = props.book.publisher;
      publicationDate.value = props.book.publicationDate;
      pages.value = props.book.pages;
    }
  }
});

const handleSaveBook = () => {
  if (!title.value.trim() || !author.value.trim()) {
    error.value = 'All fields are required.';
    return;
  }
  error.value = '';

  const bookData = {
    title: title.value,
    author: author.value,
    isbn: isbn.value,
    description: description.value,
    coverImage: coverImage.value,
    genre: genre.value,
    publisher: publisher.value,
    publicationDate: publicationDate.value,
    pages: pages.value,
  };

  if (isEdit.value) {
    bookStore.updateBook({ id: id, ...bookData });
    showSuccess('updated');
  } else {
    bookStore.addBook(bookData);
    showSuccess('created');
  }

  handleCancel();
};

const handleCancel = () => emit('cancel');
</script>
