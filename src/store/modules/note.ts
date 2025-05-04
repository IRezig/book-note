import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllNotes, createNote, getNoteById, putNote, deleteNote } from '../../api/note';
import { Note } from '../../modals';
import { useToast } from '../../composables/useToast';

export const useNoteStore = defineStore('note', () => {
  const { showSuccess, showError } = useToast();
  const notes = ref<Note[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const loadNotes = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await getAllNotes();
      notes.value = response;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch notes';
    } finally {
      isLoading.value = false;
    }
  };

  const addNote = async (newNote: Note) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await createNote(newNote);
      showSuccess('created');
      notes.value.push(response.data);
    } catch (err: any) {
      error.value = err.message || 'Failed to create note';
      showError('Could not create note');
    } finally {
      isLoading.value = false;
    }
  };

  const getNote = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const note = await getNoteById(id);
      return note;
    } catch (err: any) {
      error.value = err.message || 'Failed to get note';
    } finally {
      isLoading.value = false;
    }
  };

  const updateNote = async (id: string, updatedNote: Note) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await putNote(id, updatedNote);
      const index = notes.value.findIndex((n) => String(n.id) === String(id));
      if (index !== -1) {
        notes.value[index] = response.data;
      }
      showSuccess('updated');
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to update note';
      showError('updated');
    } finally {
      isLoading.value = false;
    }
  };

  const removeNote = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await deleteNote(id);
      notes.value = notes.value.filter((note) => String(note.id) !== String(id));
      return response.data;
    } catch (err: any) {
      error.value = err.message || 'Failed to delete note';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    notes,
    isLoading,
    error,
    loadNotes,
    addNote,
    getNote,
    updateNote,
    removeNote,
  };
});
