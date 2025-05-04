import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllBooks, createBook, getBookById, putBook, deleteBook } from '../../api/book';
import { Book } from '../../modals';
import { useToast } from '@/composables/useToast';
export const useBookStore = defineStore('book', () => {
  const { showSuccess, showError } = useToast();
  const books = ref<Book[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadBooks = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getAllBooks();
      books.value = response;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch books';
    } finally {
      isLoading.value = false;
    }
  };

  const addBook = async (newBook: Book) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createBook(newBook);
      showSuccess('created');
      books.value.push(response.data);
    } catch (err: any) {
      error.value = err.message || 'Failed to create book';
      showError('Could not create book');
    } finally {
      isLoading.value = false;
    }
  };

  const getBook = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const book = await getBookById(id);
      return book;
    } catch (err: any) {
      error.value = err.message || 'Failed to get book';
    } finally {
      isLoading.value = false;
    }
  };

  const updateBook = async (id: string, updatedBook: Book) => {
    isLoading.value = true;
    error.value = null;
    console.log('language', updatedBook.language);
    try {
      const response = await putBook(id, updatedBook);
      const index = books.value.findIndex((b) => String(b.id) === String(id));
      if (index !== -1) {
        books.value[id] = response.data;
      }
      showSuccess('updated');

      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to update book';
      showError('updated');
    } finally {
      isLoading.value = false;
    }
  };

  const removeBook = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deleteBook(id);
      books.value = books.value.filter((book) => String(book.id) !== String(id));
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete book';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    books,
    isLoading,
    error,
    loadBooks,
    addBook,
    getBook,
    updateBook,
    removeBook,
  };
});
