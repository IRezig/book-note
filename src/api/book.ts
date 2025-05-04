import { Book } from '@/modals';
import apiClient from './apiClient';

async function getAllBooks() {
  const response = await apiClient.get('/books');
  return response.data;
}

async function createBook(bookData: Book) {
  const response = await apiClient.post('/books', bookData);
  return response.data;
}

async function getBookById(bookId: string) {
  const response = await apiClient.get(`/books/${bookId}`);
  return response.data;
}

async function putBook(bookId: string, bookData: Book) {
  const response = await apiClient.put(`/books/${bookId}`, bookData);
  return response.data;
}

async function deleteBook(bookId: string) {
  const response = await apiClient.delete(`/books/${bookId}`);
  return response.data;
}

export { getAllBooks, createBook, getBookById, putBook, deleteBook };
