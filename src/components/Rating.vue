<template>
  <PrimeRating :modelValue="rating" :cancel="false" :readonly="readonly" @change="handleChange">
    <template #onicon>
      <img src="../../public/monkey-reading-glasses.png" height="40" width="40" />
    </template>
    <template #officon>
      <img src="../../public/monkey-sad.png" height="40" width="40" />
    </template>
  </PrimeRating>
</template>
<script setup lang="ts">
import { Rating as PrimeRating } from 'primevue';

const { rating, readonly } = defineProps({
  rating: Number,
  readonly: Boolean,
});

const emit = defineEmits(['update:rating']);

const handleChange = (event) => {
  console.log(event.value);
  emit('update:rating', event.value);
};
</script>
