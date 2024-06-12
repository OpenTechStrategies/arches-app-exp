import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResourceStore = defineStore('resource', () => {
  const resourceId = ref<string>('');

  return { resourceId };
});
