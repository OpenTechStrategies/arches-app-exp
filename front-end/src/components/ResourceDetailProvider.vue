<template>
  <slot :resource="resource" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useResourceStore } from '../stores/resourceStore';
const store = useResourceStore();
const resource = ref(null);

async function fetchResource() {
  if (!store.resourceId) return;
  const url = new URL(`${import.meta.env.VITE_ARCHES_API_URL}/resources/${store.resourceId}`);
  const params = new URLSearchParams({
    format: 'json'
  });
  url.search = params.toString();
  const response = await fetch(url.toString());
  const data = await response.json();
  resource.value = data;
}

watch(
  () => store.resourceId,
  async (newResourceId) => {
    if (newResourceId) {
      await fetchResource();
    }
  },
  { immediate: true }
);
</script>
