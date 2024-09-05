import { PANEL_RESOURCE_TYPE } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useResourceStore = defineStore('resource', () => {
  const resourceId = ref<string | undefined>(undefined);
  const resourceType = ref<PANEL_RESOURCE_TYPE | undefined>(undefined);
  return { resourceId, resourceType };
});
