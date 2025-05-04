<template>
  <div v-if="bookStore.isLoading" class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cozy-brown"></div>
  </div>
  <div v-else class="min-h-screen bg-orange-100 py-8 px-4 sm:px-6 lg:px-8 rounded-xl">
    <div class="flex justify-between items-center">
      <Button
        class="mb-6 p-button-text flex items-center text-gray-600 hover:text-gray-900"
        icon="pi pi-arrow-left"
        label="Back to Library"
        @click="router.push('/')"
      />
      <Button
        class="mb-6 p-button-text flex items-center text-gray-600 hover:text-gray-900"
        icon="pi pi-trash"
        label="Delete Book"
        @click="handleDeleteBook"
      />
    </div>
    <div class="animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Book Cover -->
        <div class="md:col-span-1">
          <div class="book-cover aspect-[2/3] max-w-xs mx-auto">
            <img
              :src="book.coverImage"
              :alt="`${book.title} cover`"
              class="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div class="mt-6 flex justify-center space-x-3">
            <Button variant="outline" class="flex items-center gap-2" @click="handleAddNote">
              <i class="pi pi-bookmark mr-2"></i>
              <span>Add a note</span>
            </Button>
            <Button class="bg-cozy-amber hover:bg-cozy-amber/80 flex items-center gap-2" @click="handleEditBook">
              <i class="pi pi-book mr-2"></i>
              <span>Update Book</span>
            </Button>
          </div>
        </div>

        <!-- Book Details -->
        <div class="md:col-span-2 space-y-6">
          <div>
            <h1 class="font-serif text-3xl md:text-4xl font-bold text-blue-500 mb-2">{{ book.title }}</h1>
            <p class="text-lg text-gray-600">by {{ book.author }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <Tag v-for="genre in book.genres" :key="genre" :value="genre"></Tag>
            </div>
          </div>
          <Card class="p-6 bg-white/80 backdrop-blur-sm">
            <template #content>
              <h2 class="font-serif text-xl font-semibold mb-4 text-orange-600">About this book</h2>
              <p class="text-gray-700 leading-relaxed">{{ book.description }}</p>
            </template>
          </Card>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-yellow-200 p-4 rounded-lg">
              <div class="flex items-center mb-3">
                <i class="pi pi-book text-blue-300 mr-2"></i>
                <h3 class="font-medium text-blue-300 mb-2">Details</h3>
              </div>
              <ul class="space-y-2 text-sm">
                <li class="flex justify-between">
                  <span class="text-gray-600">Pages</span>
                  <span class="font-medium">{{ book.pages }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-yellow-100 p-4 rounded-lg">
              <div class="flex items-center mb-3">
                <i class="pi pi-bookmark text-blue-300 mr-2"></i>
                <h3 class="font-medium text-blue-300">Reader's Notes</h3>
              </div>
              <p class="text-sm text-gray-600 italic">
                {{ book.description }}
              </p>
            </div>
          </div>
          <Rating :rating="book.rating" readonly />
        </div>
      </div>
    </div>
  </div>
  <NoteModal v-if="showNoteModal" :book="book" @cancel="handleCloseNoteModal" @update="refreshBook" />
  <Modal v-if="showModal" :book="book" @cancel="handleCloseModal" @update="refreshBook" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Card, Tag } from 'primevue';
import { useBookStore } from '@/store/modules/book';
import { Book } from '@/modals';
import { useToast } from '@/composables/useToast';
import NoteModal from '@/components/NoteModal.vue';
import Rating from '@/components/Rating.vue';
const bookStore = useBookStore();
const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const showNoteModal = ref(false);
const { showSuccess } = useToast();
const { id } = route.params;

const book = ref<Book>({
  id: 0,
  title: '',
  author: '',
  description: '',
  coverImage: '',
  genres: [],
  pages: 0,
  language: '',
  rating: 0,
});

const handleEditBook = () => {
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
};

const handleDeleteBook = async () => {
  if (id) {
    await bookStore.removeBook(String(id));
    showSuccess('deleted');
    setTimeout(() => router.push('/'), 800);
  }
};

const refreshBook = async () => {
  const newBook = await bookStore.getBook(book.value.id.toString());
  book.value = newBook;
};

const handleAddNote = () => {
  showNoteModal.value = true;
};

const handleCloseNoteModal = () => {
  showNoteModal.value = false;
};

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      const getBookData = await bookStore.getBook(String(newId));
      if (getBookData) {
        book.value = getBookData;
      }
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
