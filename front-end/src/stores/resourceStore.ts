import { defineStore } from 'pinia';
import { ref } from 'vue';

const useResourceStore = defineStore('resource', () => {
  const resourceId = ref<string | undefined>(undefined);
  return { resourceId };
});

export default useResourceStore;
