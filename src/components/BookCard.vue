<template>
   <Card class="w-80 h-80 overflow-hidden mt-4 hover:cursor-pointer" @click="handleClick">
        <template #header>
            <div class="relative w-full h-40">
                <img
                    :alt="'user header'"
                    :src="selectedImage"
                    class="w-full h-40 object-cover cursor-pointer"
                    tabindex="0"
                    aria-label="Post header image"
                />
            </div>
        </template>
        <template #title>{{ book.title }}</template>
        <template #subtitle>{{ book.author }}        </template>
        <template #content>
           <div class="mt-2 flex flex-wrap gap-2">
              <Tag v-for="genre in book.genres" :key="genre" :value="genre"></Tag>
          </div>
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
  new URL('../../public/books.png', import.meta.url).href,
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
