<template>
   <Card style="width: 20rem; overflow: hidden; margin: 1rem" @click="handleClick">
        <template #header>
            <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #subtitle>{{ post.created_at }}</template>
        <template #content>
            <p class="m-0">
              {{ post.content }}
            </p>
        </template>
        
    </Card>
</template>

<script setup lang="ts">
import { Post } from '../modals';
import Card from 'primevue/card';
import { useRouter } from 'vue-router';

const router = useRouter();

const { post } = defineProps<{ post: Post }>();

const handleClick = () => {
  router.push(`/reflection/${post.id}`);
};
</script>
