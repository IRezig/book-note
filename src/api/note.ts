import { Note } from '../modals';
import apiClient from './apiClient';

const getAllNotes = async () => {
  const response = await apiClient.get('/notes');
  return response.data;
};

const createNote = async (noteData: Note) => {
  const response = await apiClient.post('/notes', noteData);
  return response.data;
};

const getNoteById = async (noteId: string) => {
  const response = await apiClient.get(`/notes/${noteId}`);
  return response.data;
};

const putNote = async (noteId: string, noteData: Note) => {
  const response = await apiClient.put(`/notes/${noteId}`, noteData);
  return response.data;
};

const deleteNote = async (noteId: string) => {
  const response = await apiClient.delete(`/notes/${noteId}`);
  return response.data;
};

export { getAllNotes, createNote, getNoteById, putNote, deleteNote };
