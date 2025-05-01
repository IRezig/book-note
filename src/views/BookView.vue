<template>
  <div class="min-h-screen bg-orange-100 py-8 px-4 sm:px-6 lg:px-8 rounded-xl">
    <Button
      class="mb-6 p-button-text flex items-center text-gray-600 hover:text-gray-900"
      icon="pi pi-arrow-left"
      label="Back to Library"
      @click="router.push('/')"
    />

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
            <Button variant="outline" class="bg-white text-white flex items-center gap-2">
              <i class="pi pi-bookmark mr-2"></i>
              <span>Save</span>
            </Button>
            <Button class="bg-cozy-amber text-white hover:bg-cozy-amber/80 flex items-center gap-2">
              <i class="pi pi-book mr-2"></i>
              <span>Read Now</span>
            </Button>
          </div>
        </div>

        <!-- Book Details -->
        <div class="md:col-span-2 space-y-6">
          <div>
            <h1 class="font-serif text-3xl md:text-4xl font-bold text-cozy-brown mb-2">{{ book.title }}</h1>
            <p class="text-lg text-gray-600">by {{ book.author }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <Tag
                v-for="genre in book.genre"
                :key="genre"
                class="bg-cozy-beige text-cozy-brown border-cozy-brown/30"
                :value="genre"
              />
            </div>
          </div>

          <Card class="p-6 bg-white/80 backdrop-blur-sm">
            <template #content>
              <h2 class="font-serif text-xl font-semibold mb-4 text-cozy-brown">About this book</h2>
              <p class="text-gray-700 leading-relaxed">{{ book.description }}</p>
            </template>
          </Card>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-cozy-beige/50 p-4 rounded-lg">
              <h3 class="font-medium text-cozy-brown mb-2">Details</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex justify-between">
                  <span class="text-gray-600">Publisher</span>
                  <span class="font-medium">{{ book.publisher }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Publication Date</span>
                  <span class="font-medium">{{ book.publicationDate }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Pages</span>
                  <span class="font-medium">{{ book.pages }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">ISBN</span>
                  <span class="font-medium">{{ book.isbn }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-cozy-sage/30 p-4 rounded-lg">
              <div class="flex items-center mb-3">
                <i class="pi pi-bookmark text-cozy-brown mr-2"></i>
                <h3 class="font-medium text-cozy-brown">Reader's Notes</h3>
              </div>
              <p class="text-sm text-gray-600 italic">
                "A cozy reading companion for those quiet evenings with a cup of tea."
              </p>
              <div class="mt-3 text-sm text-right text-cozy-terracotta">- CozyReads Editor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Card, Tag } from 'primevue';
import { useBookToast } from '@/composables/useBookToast';
import { useBookStore } from '@/store/modules/book';
import { BookT } from '@/modals';

const bookStore = useBookStore();
const router = useRouter();
const route = useRoute();
const { showSuccess, showError } = useBookToast();

const book = ref<BookT>({
  id: 0,
  title: '',
  author: '',
  description: '',
  coverImage: '',
  genre: [],
  publisher: '',
  publicationDate: '',
  pages: 0,
  isbn: '',
});

const loadBook = async () => {
  const { id } = route.params;
  if (id) {
    const existingBook = await bookStore.getBook(String(id));
    if (existingBook) {
      book.value = existingBook;
    }
  }
};

onMounted(() => {
  loadBook();
});
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
