<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Daily Coding Reflection</h1>

      <label for="reflection-title" class="block text-gray-700 font-medium mb-1" tabindex="0" aria-label="Title">
        Title
      </label>
      <InputText
        id="reflection-title"
        v-model="book.title"
        placeholder="Give your reflection a title"
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <label for="reflection-content" class="block text-gray-700 font-medium mb-1" tabindex="0" aria-label="Content">
        Content
      </label>
      <Textarea
        id="reflection-content"
        v-model="book.content"
        placeholder="Write your reflection here"
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <Button
        class="w-full text-white mt-4"
        :label="isUpdate ? 'Update' : 'Save'"
        :icon="isUpdate ? 'pi pi-pencil' : 'pi pi-save'"
        @click="handleSubmit"
      />
      <Button
        v-if="isUpdate"
        class="w-full text-white mt-4"
        :label="'Delete'"
        :icon="'pi pi-trash'"
        @click="handleDelete"
      />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, InputText, Textarea } from 'primevue';
import Toast from 'primevue/toast';
import { useBookToast } from '@/composables/useBookToast';
import { useBookStore } from '@/store/modules/book';
import { BookT } from '@/modals';

const bookStore = useBookStore();
const router = useRouter();
const { showSuccess, showError } = useBookToast();

const { id } = useRoute().params;
const isUpdate = ref<boolean>(false);

const book = ref<BookT>({
  id: 0,
  title: '',
  author: '',
  description: '',
});

const handleSubmit = async () => {
  if (isUpdate.value) {
    await bookStore.updateBook(String(id), book.value);
    if (!bookStore.error) {
      showSuccess('updated');
      setTimeout(() => router.push('/'), 800);
      return;
    } else {
      showError(bookStore.error);
    }
  } else {
    await bookStore.addBook(book.value);
    if (!bookStore.error) {
      showSuccess('created');
      setTimeout(() => router.push('/'), 800);
      return;
    } else {
      showError(bookStore.error);
    }
  }
};

const handleDelete = async () => {
  await bookStore.removeBook(String(id));
  if (!bookStore.error) {
    showSuccess('deleted');
    setTimeout(() => router.push('/'), 800);
    return;
  } else {
    showError(bookStore.error);
  }
};

const loadBook = async () => {
  if (id) {
    const existingBook = await bookStore.getBook(String(id));
    if (existingBook) {
      book.value = existingBook;
      isUpdate.value = true;
    }
  }
};

onMounted(() => {
  loadBook();
});
</script>

<style scoped lang="less"></style>
