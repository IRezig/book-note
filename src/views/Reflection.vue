<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Daily Coding Reflection</h1>

      <InputText
        v-model="post.title"
        label="Title"
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <InputText
        v-model="post.content"
        label="Content"
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
import { Button, InputText } from 'primevue';
import Toast from 'primevue/toast';
import { usePostToast } from '@/composables/usePostToast';
import { usePostStore } from '@/store/modules/post';
import { Post } from '@/modals';

const postStore = usePostStore();
const router = useRouter();
const { showSuccess, showError } = usePostToast();

const { id } = useRoute().params;
const isUpdate = ref<boolean>(false);

const post = ref<Post>({
  id: 0,
  title: '',
  content: '',
});

const handleSubmit = async () => {
  if (isUpdate.value) {
    await postStore.updatePost(String(id), post.value);
    if (!postStore.error) {
      showSuccess('updated');
      setTimeout(() => router.push('/'), 800);
      return;
    } else {
      showError(postStore.error);
    }
  } else {
    await postStore.addPost(post.value);
    if (!postStore.error) {
      showSuccess('created');
      setTimeout(() => router.push('/'), 800);
      return;
    } else {
      showError(postStore.error);
    }
  }
};

const handleDelete = async () => {
  await postStore.removePost(String(id));
  if (!postStore.error) {
    showSuccess('deleted');
    setTimeout(() => router.push('/'), 800);
    return;
  } else {
    showError(postStore.error);
  }
};

const loadPost = async () => {
  if (id) {
    const existingPost = await postStore.getPost(String(id));
    if (existingPost) {
      post.value = existingPost;
      isUpdate.value = true;
    }
  }
};

onMounted(() => {
  loadPost();
});
</script>

<style scoped lang="less"></style>
