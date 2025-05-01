<template>
   <Card class="w-80 h-80 overflow-hidden mt-4 hover:cursor-pointer" @click="handleClick">
        <template #header>
            <img
                :alt="'user header'"
                :src="selectedImage"
                class="w-full h-40 object-cover cursor-pointer"
                tabindex="0"
                aria-label="Post header image"
            />
        </template>
        <template #title>{{ book.title }}</template>
        <template #subtitle>{{ formatToDate(book.created_at) }}</template>
        <template #content>
            <p class="m-0">
              {{ book.content }}
            </p>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Book } from '../modals';
import Card from 'primevue/card';
import { useRouter } from 'vue-router';
import { formatToDate } from '../utils/date';

const router = useRouter();
const { book } = defineProps<{ book: Book }>();

const imagePaths = [
  new URL('../../public/code_1.jpg', import.meta.url).href,
  new URL('../../public/code_2.jpg', import.meta.url).href,
  new URL('../../public/code_3.jpg', import.meta.url).href
];

const shuffleImages = (images: string[]): string => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const selectedImage = shuffleImages(imagePaths);

const handleClick = () => {
  router.push(`/book/${book.id}`);
};
</script>
