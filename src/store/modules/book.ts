import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllPosts, createPost, getPostById, putPost, deletePost } from '../../api/post';
import { Post } from '../../modals';

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadPosts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getAllPosts();
      posts.value = response;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch posts';
    } finally {
      isLoading.value = false;
    }
  };

  const addPost = async (newPost: Post) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createPost(newPost);
      posts.value.push(response.data);
    } catch (err: any) {
      error.value = err.message || 'Failed to create post';
    } finally {
      isLoading.value = false;
    }
  };

  const getPost = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const post = await getPostById(id);
      return post;
    } catch (err: any) {
      error.value = err.message || 'Failed to get post';
    } finally {
      isLoading.value = false;
    }
  };

  const updatePost = async (id: string, updatedPost: Post) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await putPost(id, updatedPost);
      const index = posts.value.findIndex((p) => String(p.id) === String(id));
      if (index !== -1) {
        posts.value[index] = response.data;
      }
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to update post';
    } finally {
      isLoading.value = false;
    }
  };

  const removePost = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deletePost(id);
      posts.value = posts.value.filter((post) => String(post.id) !== String(id));
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete post';
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
    getPost,
    updatePost,
    removePost,
  };
});
