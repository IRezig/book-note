import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1);

  const accumulate = () => {
    count.value++;
  };

  return { count, accumulate };
});
