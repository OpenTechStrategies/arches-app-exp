<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ResourceArray } from '../types';
const resources = ref<any | null>(null);

async function fetchResources() {
  const response = await fetch(`${import.meta.env.VITE_ARCHES_API_URL}/search/resources`).then(
    (res) => res.json()
  );
  
  resources.value = { items: response.results.hits.hits };
}

fetchResources();
</script>

<template>
  <slot :resources="resources" />
</template>

<style scoped></style>
