<template>
  <div class="card flex justify-center">Hello</div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'save']);

const cancel = () => {
  emit('cancel');
};

const save = () => {
  emit('save');
};
</script>
