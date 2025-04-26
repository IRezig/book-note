import apiClient from './apiClient';

async function getAllPosts() {
  const response = await apiClient.get('/posts');
  return response.data;
}

async function createPost(postData) {
  const response = await apiClient.post('/posts', postData);
  return response.data;
}

async function getPostById(postId) {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
}

async function putPost(postId, postData) {
  const response = await apiClient.put(`/posts/${postId}`, postData);
  return response.data;
}

async function deletePost(postId) {
  const response = await apiClient.delete(`/posts/${postId}`);
  return response.data;
}

export { getAllPosts, createPost, getPostById, putPost, deletePost };
