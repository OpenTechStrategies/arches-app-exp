<template>
  <button class="list-button" :class="{ disabled: !hasNext }" :disabled="!hasNext" @click="getPage">
    {{ props.type }}
  </button>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
const props = defineProps<{
  type: string;
  flag: Ref<boolean>;
}>();
const hasNext = ref(props.flag);
const emit = defineEmits(['next', 'previous']);
const getPage = () => {
  if (props.type === 'next') {
    emit('next');
  } else {
    emit('previous');
  }
};
</script>

<style scoped>
.list-button {
  padding: 20px;
  margin: 20px;
}
</style>
