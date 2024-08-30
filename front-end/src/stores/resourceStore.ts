import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResourceStore = defineStore('resource', () => {
  const resourceId = ref<string | undefined>(undefined);

  return { resourceId };
});
