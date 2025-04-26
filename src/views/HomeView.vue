<script setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import PostCard from '@/components/PostCard.vue';
import { usePostStore } from '@/store/modules/post';
import CreateReflectionCard from '@/components/CreateReflectionCard.vue';

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);

const validPosts = computed(() => posts.value.filter((post) => post && post.id));

onMounted(() => {
  postStore.loadPosts();
});
</script>

<template>
  <main class="flex flex-wrap items-center justify-center gap-4">
    <CreateReflectionCard />
    <PostCard v-for="post in validPosts" :key="post.id" :post="post" />
  </main>
</template>

<style scoped></style>
