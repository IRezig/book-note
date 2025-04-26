<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import TheWelcome from '@/components/TheWelcome.vue';
import PostCard from '@/components/PostCard.vue';
import { usePostStore } from '@/store/modules/post';

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

onMounted(() => {
  postStore.loadPosts();
});
</script>

<template>
  <main>
    <TheWelcome />
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </main>
</template>
