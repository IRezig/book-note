<template>
  <main class="flex flex-col items-center justify-center gap-4">
    <InputText
      v-model="searchQuery"
      type="text"
      class="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      placeholder="Search books by title..."
      aria-label="Search books by title"
      tabindex="0"
    />
    <div class="flex flex-wrap items-center justify-center gap-4">
      <CreateBookCard />
      <BookCardCard v-for="book in filteredBooks" :key="book.id" :book="book" />
    </div>
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import BookCardCard from '@/components/BookCard.vue';
import { useBookStore } from '@/store/modules/book';
import CreateBookCard from '@/components/CreateBookCard.vue';
import { InputText } from 'primevue';

const bookStore = useBookStore();
const { books } = storeToRefs(bookStore);

const searchQuery = ref('');

const validBooks = computed(() => books.value.filter((book) => book && book.id));

const filteredBooks = computed(() => {
  if (!searchQuery.value.trim()) return validBooks.value;
  return validBooks.value.filter(
    (book) => book.title && book.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(() => {
  bookStore.loadBooks();
});
</script>

<style scoped></style>
