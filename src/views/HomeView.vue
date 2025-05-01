<script setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import BookCardCard from '@/components/BookCard.vue';
import { useBookStore } from '@/store/modules/book';
import CreateBookCard from '@/components/CreateBookCard.vue';

const bookStore = useBookStore();
const { books } = storeToRefs(bookStore);

const validBooks = computed(() => books.value.filter((book) => book && book.id));

onMounted(() => {
  bookStore.loadBooks();
});
</script>

<template>
  <main class="flex flex-wrap items-center justify-center gap-4">
    <CreateBookCard />
    <BookCardCard v-for="book in validBooks" :key="book.id" :book="book" />
  </main>
</template>

<style scoped></style>
