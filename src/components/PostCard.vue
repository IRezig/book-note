<template>
  <div
    class="border border-gray-300 p-4 rounded mb-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    tabindex="0"
    :aria-label="`Post card for ${post.title}`"
    role="article"
  >
    <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
    <p class="mb-2 text-gray-700">{{ post.content }}</p>
    <p class="text-xs text-gray-500">{{ post.created_at }}</p>
  </div>
</template>

<script setup lang="ts">
import { Posts } from '../modals';

const { post } = defineProps<{ post: Posts }>();
</script>
