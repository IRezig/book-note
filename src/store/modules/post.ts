import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllPosts, createPost } from '../../api/post';
import { Posts } from '../../modals';

export const usePostStore = defineStore('post', () => {
  const posts = ref<Posts[]>([]);

  const isLoading = ref(false);
  const error = ref(null);

  const loadPosts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getAllPosts();
      posts.value = response;
    } catch (err) {
      error.value = err.message || 'Failed to fetch posts';
    } finally {
      isLoading.value = false;
    }
  };

  const addPost = async (newPost) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createPost(newPost);
      posts.value.push(response.data);
    } catch (err) {
      error.value = err.message || 'Failed to create post';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    posts,
    isLoading,
    error,
    loadPosts,
    addPost,
  };
});
