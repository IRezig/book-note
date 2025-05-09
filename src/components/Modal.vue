<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-orange-100/60"
    tabindex="0"
    aria-modal="true"
    role="dialog"
    aria-label="Add a new Book Modal"
    @click.self="handleCancel"
  >
    <div class="bg-white rounded-lg shadow-lg w-3/4 p-6 relative" @click.stop>
      <h2 class="text-2xl font-bold mb-4 text-orange-700">{{ isEdit ? 'Edit Book' : 'Add a New Book' }}</h2>
      <form class="space-y-4" @submit.prevent="handleSaveBook">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Title</span>
            <input
              v-model="title"
              type="text"
              class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              aria-label="Book Title"
              placeholder="Enter Book Title"
              autofocus
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Author</span>
            <input
              v-model="author"
              type="text"
              class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              aria-label="Book Author"
              placeholder="Enter author name"
            />
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Cover Image</span>
            <ImageButton @file-selected="handleImageSelected" />
            <div v-if="coverImagePreview" class="mt-2 flex justify-center">
              <img :src="coverImagePreview" alt="Book cover preview" class="max-h-32 rounded shadow" />
            </div>
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Pages</span>
            <input
              v-model="pages"
              type="number"
              class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Pages"
              placeholder="Number of pages (optional)"
              min="1"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Language</span>
            <Select
              v-model="language"
              :options="languagesOptions"
              optionLabel="name"
              placeholder="Select Language"
              class="w-full text-black"
              style="background-color: white; color: black"
              :showClear="true"
              aria-label="Select Language"
            >
              <template #option="{ option }">
                <div class="flex items-center">
                  <img :src="option.image" :alt="option.name" class="w-6 h-6 mr-2" />
                  {{ option.name }}
                </div>
              </template>
            </Select>
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Genres</span>
            <MultiSelect
              v-model="genres"
              :options="genresOptions"
              optionLabel="name"
              placeholder="Select Genres"
              style="background-color: white; color: black"
              display="chip"
              :showClear="true"
              aria-label="Select Genres"
              multiple
            />
          </label>
          <label class="flex flex-col gap-1 items-center">
            <span class="text-sm font-medium text-gray-700">Rating</span>
            <Rating :rating="rating" @update:modelValue="handleModelValueUpdate" />
          </label>
        </div>
        <label class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700">Description</span>
          <textarea
            v-model="description"
            class="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
            aria-label="Book Description"
            placeholder="Book description"
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
            aria-label="Add Book"
          >
            {{ isEdit ? 'Edit Book' : 'Add Book' }}
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
import { useBookStore } from '@/store/modules/book';
import { useRoute } from 'vue-router';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import Rating from './Rating.vue';
import ImageButton from './ImageButton.vue';

const route = useRoute();
const title = ref('');
const author = ref('');
const description = ref('');
const coverImage = ref('');
const genres = ref([]);
const pages = ref(0);
const language = ref('English');
const rating = ref(4);
const error = ref('');
const bookStore = useBookStore();
const coverImagePreview = ref('');

const genresOptions = ref([
  { name: 'Fantasy', code: 'FA' },
  { name: 'Mystery', code: 'MY' },
  { name: 'Romance', code: 'RO' },
  { name: 'Science Fiction', code: 'SF' },
  { name: 'Thriller', code: 'TH' },
  { name: 'Crime', code: 'CR' },
  { name: 'Horror', code: 'HO' },
  { name: 'Documentary', code: 'DO' },
  { name: 'Biography', code: 'BI' },
  { name: 'Autobiography', code: 'AU' },
  { name: 'Philosophy', code: 'PH' },
  { name: 'History', code: 'HI' },
  { name: 'Self Development', code: 'SD' },
]);
const languagesOptions = ref([
  { name: 'English', code: 'EN', image: '../../public/english.png' },
  { name: 'Arabic', code: 'AR', image: '../../public/arabic.png' },
  { name: 'French', code: 'FR', image: '../../public/french.png' },
]);

const { id } = route.params;
const isEdit = ref(false);
const props = defineProps(['book']);
const emit = defineEmits(['cancel']);

onMounted(() => {
  if (id) {
    isEdit.value = true;
    if (props.book) {
      title.value = props.book.title;
      author.value = props.book.author;
      description.value = props.book.description;
      coverImage.value = props.book.coverImage;
      genres.value = genresOptions.value.filter(
        (option) => props.book.genres && props.book.genres.includes(option.name),
      );
      pages.value = props.book.pages;
      language.value = languagesOptions.value.find((option) => option.name === props.book.language);
      rating.value = props.book.rating;
    }
  }
});

const handleModelValueUpdate = (value) => {
  rating.value = value;
};

const handleSaveBook = () => {
  if (!title.value.trim() || !author.value.trim()) {
    error.value = 'All fields are required.';
    return;
  }
  error.value = '';

  const genresArray = genres.value.map((g) => g.name);

  const bookData = {
    title: title.value,
    author: author.value,
    description: description.value,
    coverImage: coverImage.value,
    genres: genresArray,
    pages: pages.value,
    language: language.value.name,
    rating: rating.value,
  };

  if (isEdit.value) {
    bookStore.updateBook(id, bookData);
    emit('update');
  } else {
    bookStore.addBook(bookData);
    bookStore.loadBooks();
  }

  emit('cancel');
};

const handleCancel = () => emit('cancel');

const handleImageSelected = (file) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    coverImagePreview.value = e.target.result;
    coverImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
