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
        <template #subtitle>{{ book.author }}</template>
        <Tag
          v-for="genre in book.genre"
          :key="genre"
          class="bg-amber-400 text-cozy-brown border-cozy-brown/30"
          :value="genre"
        />
        <template #content>
            <p class="m-0">
              {{ book.description }}
            </p>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Book } from '../modals';
import { Card, Tag } from 'primevue';
import { useRouter } from 'vue-router';

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
