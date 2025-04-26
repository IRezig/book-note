<template>
  <div class="pinia">
    <div class="counter">
      <t-card> {{ count }} </t-card>
      <t-button style="margin-top: 10px" @click="accumulate">more</t-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCounterStore } from '@/store';

export default {
  setup() {
    const counterStore = useCounterStore();
    const count = computed(() => counterStore.count);
    const accumulate = () => counterStore.accumulate();
    return {
      count,
      accumulate,
    };
  },
};
</script>

<style lang="less">
@media (min-width: 1024px) {
  .pinia {
    display: flex;
    align-items: center;
    min-height: 100vh;

    .counter {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
