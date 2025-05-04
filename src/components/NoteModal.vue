<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-orange-100/60"
    tabindex="0"
    aria-modal="true"
    role="dialog"
    aria-label="Add or Edit Note Modal"
    @click.self="handleCancel"
    @keydown.esc="handleCancel"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative" @click.stop>
      <h2 class="text-2xl font-bold mb-4 text-blue-700">{{ isEdit ? 'Edit Note' : 'Add a New Note' }}</h2>
      <form class="space-y-4" @submit.prevent="handleSaveNote">
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Title</span>
          <input
            v-model="title"
            type="text"
            class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            aria-label="Note Title"
            placeholder="Enter Note Title"
            autofocus
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Content</span>
          <textarea
            v-model="content"
            class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
            aria-label="Note Content"
            placeholder="Note content"
            required
          ></textarea>
        </label>
        <div v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</div>
        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            class="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Cancel"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-orange-400 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Save Note"
          >
            {{ isEdit ? 'Edit Note' : 'Add Note' }}
          </button>
        </div>
      </form>
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 focus:outline-none"
        aria-label="Close modal"
        tabindex="0"
        @click="handleCancel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNoteStore } from '../store/modules/note';

const props = defineProps({ note: Object });
const emit = defineEmits(['cancel', 'update']);

const title = ref('');
const content = ref('');
const error = ref('');
const isEdit = ref(false);
const noteStore = useNoteStore();

onMounted(() => {
  if (props.note) {
    isEdit.value = true;
    title.value = props.note.title;
    content.value = props.note.content;
  }
});

const handleSaveNote = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    error.value = 'All fields are required.';
    return;
  }
  error.value = '';
  const noteData = {
    title: title.value,
    content: content.value,
  };
  if (isEdit.value && props.note && props.note.id) {
    await noteStore.updateNote(String(props.note.id), noteData);
    emit('update');
  } else {
    await noteStore.addNote(noteData);
    await noteStore.loadNotes();
  }
  handleCancel();
};

const handleCancel = () => emit('cancel');
</script>
